import React, { FC, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import Button from '../Button';

export interface ProgressPageItems {
  text: string;
  status: ProgressStatus;
}

export type ProgressStatus = 'loading' | 'failed' | 'done';

interface Props {
  title: string;
  processItems: Array<ProgressPageItems>;
  countdown?: number;
  cancelButtonOnClick: () => any;
  retryButtonOnClick: () => any;
  isRetryButtonDisable?: boolean;
  onMountProcessingPage?: Function;
}

export type ProcessingPageProps = Props;
const ProcessingPage: FC<ProcessingPageProps> = props => {
  useEffect(() => {
    if (props.onMountProcessingPage != undefined) props.onMountProcessingPage();
  }, []);

  const renderProgressStatus = (status: ProgressStatus) => {
    if (status == 'done') {
      return <View style={styles.circle} />;
    } else if (status == 'failed') {
      return <View style={styles.redCircle} />;
    } else if (status == 'loading') {
      return <ActivityIndicator size={Layout.scaleX(50)} color={Colors.primary} />;
    } else return null;
  };

  return (
    <View style={styles.content}>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.loadings}>
        {props.processItems.map((value, index) => (
          <View style={styles.loading} key={index + '-processItems'}>
            <Text style={styles.text}>{'-  ' + value.text}</Text>
            {renderProgressStatus(value.status)}
          </View>
        ))}
      </View>
      <View style={styles.bottomView}>
        {props.countdown && props.countdown > 0 ? (
          <View style={styles.countdownContainer}>
            <Text style={styles.countdown}>{props.countdown}</Text>
          </View>
        ) : null}
        <View style={styles.buttons}>
          <View style={styles.button}>
            <Button
              title={'لغو'}
              color={Colors.danger}
              height={Layout.scaleY(85)}
              onPress={() => props.cancelButtonOnClick()}
              isLoading={false}
            />
          </View>
          <View style={styles.button}>
            <Button
              title={'تلاش مجدد'}
              color={Colors.info}
              height={Layout.scaleY(85)}
              onPress={() => props.retryButtonOnClick()}
              isDisable={props.isRetryButtonDisable}
              isLoading={false}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  countdownContainer: {
    paddingBottom: Layout.scaleY(20),
  },
  bottomView: {
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  countdown: {
    fontSize: Layout.scaleX(90),
    color: '#bbb',
  },
  title: {
    top: Layout.scaleY(40),
    position: 'absolute',
    fontSize: Layout.scaleX(40),
  },
  loadings: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    top: Layout.scaleY(200),
    position: 'absolute',
  },
  circle: {
    width: Layout.scaleX(50),
    height: Layout.scaleX(50),
    borderRadius: Layout.scaleX(50) / 2,
    backgroundColor: Colors.success,
  },
  redCircle: {
    width: Layout.scaleX(50),
    height: Layout.scaleX(50),
    borderRadius: Layout.scaleX(50) / 2,
    backgroundColor: Colors.danger,
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row-reverse',
    marginBottom: Layout.scaleX(20),
  },
  text: { fontSize: Layout.scaleX(30), marginLeft: 10 },
  content: {
    flex: 1,
    width: '100%',
    // backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: Layout.scaleX(20),
  },
  buttons: {
    flexDirection: 'row-reverse',
    paddingBottom: Layout.scaleY(50),
  },
});

export default ProcessingPage;
