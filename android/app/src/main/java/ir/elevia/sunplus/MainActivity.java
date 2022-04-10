package ir.elevia.sunplus;

import android.os.Bundle;
import android.widget.ProgressBar;

import com.facebook.react.ReactActivity;

import org.devio.rn.splashscreen.SplashScreen;


public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this, R.style.SplashScreenTheme);
        super.onCreate(savedInstanceState);
    }

    @Override
    protected String getMainComponentName() {


        return "nyaa";
    }
}
