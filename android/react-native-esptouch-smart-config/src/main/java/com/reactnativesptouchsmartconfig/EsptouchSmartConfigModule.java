package com.reactnativesptouchsmartconfig;

import android.os.AsyncTask;
import android.util.Log;

import androidx.annotation.NonNull;

import com.espressif.iot.esptouch.EsptouchTask;
import com.espressif.iot.esptouch.IEsptouchResult;
import com.espressif.iot.esptouch.IEsptouchTask;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.module.annotations.ReactModule;

import java.util.ArrayList;
import java.util.List;

@ReactModule(name = EsptouchSmartConfigModule.NAME)
public class EsptouchSmartConfigModule extends ReactContextBaseJavaModule {
    public static final String NAME = "EsptouchSmartConfig";
    EsptouchAsyncTask mTask;
    private String TAG = "ESPTouchSmartConfigModule";

    private static final String E_TASK_CANCELLED = "E_TASK_CANCELLED";
    private static final String E_FAILED_TO_CONFIG_DEVICE = "E_FAILED_TO_CONFIG_DEVICE";

    public EsptouchSmartConfigModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void stop() {
        if (mTask != null) {
            Log.d(TAG, "cancel task");
            mTask.cancelEsptouch();
        }
    }

    @ReactMethod
    public void start(final ReadableMap options, final Promise promise) {
        try {
            stop();

            String SSID = options.getString("SSID");
            String BSSID = options.getString("BSSID");
            String password = options.getString("password");

            Log.d(TAG, "SSID " + SSID + ":BSSID " + BSSID + ":password " + password);

            mTask = new EsptouchAsyncTask(promise);
            mTask.execute(SSID, BSSID, password, "1");
        } catch (Exception e) {
            Log.e(TAG, e.toString());
            promise.resolve(mapResults(new ArrayList<>()));
        }
    }

    private class EsptouchAsyncTask extends AsyncTask<String, Void, List<IEsptouchResult>> {
        private final Promise promise;
        private final Object mLock = new Object();
        private IEsptouchTask mEsptouchTask;


        public EsptouchAsyncTask(Promise promise) {
            // The listener reference is passed in through the constructor
            this.promise = promise;
        }

        // without the lock, if the user tap confirm and cancel quickly enough,
        // the bug will arise. the reason is follows:
        // 0. task is starting created, but not finished
        // 1. the task is cancel for the task hasn't been created, it do nothing
        // 2. task is created
        // 3. Oops, the task should be cancelled, but it is running
        void cancelEsptouch() {
            cancel(true);

            if (mEsptouchTask != null) {
                mEsptouchTask.interrupt();
            }
        }

        @Override
        protected void onPreExecute() {
            Log.d(TAG, "starting esptouch task");
        }

        @Override
        protected List<IEsptouchResult> doInBackground(String... params) {
            Log.d(TAG, "doing esptouch task");

            try {
                int taskResultCount = -1;
                synchronized (mLock) {
                    String apSsid = params[0];
                    String apBssid = params[1];
                    String apPassword = params[2];
                    String deviceCountData = params[3];
                    taskResultCount = Integer.parseInt(deviceCountData);

                    mEsptouchTask = new EsptouchTask(apSsid, apBssid, apPassword, getCurrentActivity());
                }
                return mEsptouchTask.executeForResults(taskResultCount);
            } catch (Exception e) {
                Log.e(TAG, "esptouch task failed");
                return new ArrayList<>();
            }
        }

        @Override
        protected void onPostExecute(List<IEsptouchResult> result) {
            mEsptouchTask = null;
            Log.v(TAG, "on post execute");

            if (result == null) {
                promise.resolve(mapResults(new ArrayList<>()));
                return;
            }

            // check whether the task is cancelled and no results received
            IEsptouchResult firstResult = result.get(0);
            if (firstResult.isCancelled()) {
                promise.resolve(mapResults(new ArrayList<>()));
                return;
            }

            // the task received some results including cancelled while
            // executing before receiving enough results
            if (!firstResult.isSuc()) {
                promise.resolve(mapResults(new ArrayList<>()));
                return;
            }

            promise.resolve(mapResults(result));
        }

        @Override
        protected void onCancelled() {
            Log.v(TAG, "on cancelled");
            if (this.promise != null) {
                promise.resolve(mapResults(new ArrayList<>()));
            }
        }
    }

    public static WritableArray mapResults(final List<IEsptouchResult> taskResults) {
        final WritableArray esptouchResultArray = new WritableNativeArray();

        for (IEsptouchResult result : taskResults) {
            if (!result.isCancelled() && result.getBssid() != null) {
                final WritableMap esptouchResult = new WritableNativeMap();
                esptouchResult.putString("IPv4", result.getInetAddress().getHostAddress());
                esptouchResult.putString("BSSID", result.getBssid());
                esptouchResultArray.pushMap(esptouchResult);
                if (!result.isSuc()) break;
            }
        }

        return esptouchResultArray;
    }
}
