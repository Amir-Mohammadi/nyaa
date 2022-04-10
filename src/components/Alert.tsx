import React from 'react';
import { KeyboardTypeOptions, Modal, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import { FontFamily, FontSize } from '../constants/Fonts';
import Layout from '../constants/Layout';
import { DialogType } from '../stores/NotificationStore';
import Button from './Button';
import Input from './Input';

interface NotificationDialogProps {
  visible: boolean;
  BodyText: string;
  confirm: () => void;
  loading?: boolean;
  type: DialogType;
  onRequestClose?: () => void;
}

interface ConfirmDialogProps extends NotificationDialogProps {
  cancel: () => void;
}

interface QuestionDialogProps extends ConfirmDialogProps {
  input: {
    onChange: (value: string) => any;
    value: string;
    errorMessage?: string;
    placeHolder?: string;
    keyboardType?: KeyboardTypeOptions;
  };
}

export type AlertProps = NotificationDialogProps | ConfirmDialogProps | QuestionDialogProps;
const Alert: React.FC<AlertProps> = props => {
  const twoButtonAlert = (props: ConfirmDialogProps) => {
    return (
      <Modal
        animationType="fade"
        visible={props.visible}
        transparent={true}
        onDismiss={props.cancel}
        onRequestClose={props.cancel}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 10,
              width: '75%',
              alignItems: 'center',
            }}>
            <View style={{ paddingVertical: 20 }}>
              <View
                style={{
                  paddingHorizontal: Layout.scaleX(35),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text>{props.BodyText}</Text>
              </View>
            </View>
            <View style={styles.buttonsView}>
              <Button
                title="تایید"
                color={Colors.success}
                onPress={props.confirm}
                height={Layout.scaleY(65)}
                isLoading={props.loading ?? false}
              />
              <Button
                title="بازگشت"
                color={Colors.danger}
                onPress={props.cancel}
                height={Layout.scaleY(65)}
                isLoading={false}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const singleButtonAlert = (props: NotificationDialogProps) => {
    return (
      <Modal
        animationType="fade"
        visible={props.visible}
        transparent={true}
        onDismiss={props.onRequestClose}
        onRequestClose={props.onRequestClose}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 10,
              width: '75%',
              alignItems: 'center',
            }}>
            <View style={{ paddingVertical: 20 }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 20,
                }}>
                <Text>{props.BodyText}</Text>
              </View>
            </View>
            <View style={styles.buttonsView}>
              <Button
                title="تایید"
                color={Colors.success}
                onPress={props.confirm}
                height={Layout.scaleY(65)}
                isLoading={props.loading ?? false}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const question = (props: QuestionDialogProps) => {
    return (
      <Modal
        animationType="fade"
        visible={props.visible}
        transparent={true}
        onRequestClose={props.onRequestClose}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 10,
              width: '80%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{ paddingVertical: 10 }}>
              <Text style={styles.messageLabel}>{props.BodyText}</Text>
              <View style={{ alignItems: 'center' }}>
                <Input
                  color={props.input.errorMessage ? Colors.danger : Colors.success}
                  placeholder={props.input.placeHolder ?? ''}
                  value={props.input.value}
                  onChange={(value: string) => {
                    props.input.onChange(value);
                  }}
                  height={Layout.scaleY(93)}
                  inputmode={props.input.keyboardType ?? 'default'}
                />
                {props.input.errorMessage ? (
                  <Text style={styles.errorLabel}>• {props.input.errorMessage}</Text>
                ) : undefined}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '85%',
                paddingVertical: 20,
                justifyContent: 'space-between',
              }}>
              <Button
                title="تایید"
                color={Colors.success}
                onPress={() => {
                  props.confirm();
                }}
                height={Layout.scaleY(65)}
                isLoading={props.loading ?? false}
              />
              <Button
                title="بازگشت"
                color={Colors.danger}
                onPress={() => {
                  props.cancel();
                }}
                height={Layout.scaleY(65)}
                isLoading={false}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const typeSelector = () => {
    switch (props.type) {
      case DialogType.ALERT: {
        return singleButtonAlert(props as NotificationDialogProps);
      }
      case DialogType.CONFIRM: {
        return twoButtonAlert(props as ConfirmDialogProps);
      }
      case DialogType.QUESTION: {
        return question(props as QuestionDialogProps);
      }
      default: {
        return null;
      }
    }
  };

  return typeSelector();
};

const styles = StyleSheet.create({
  content: { paddingBottom: Layout.scaleY(0), flex: 1 },
  buttonsView: {
    flexDirection: 'row',
    width: '85%',
    paddingVertical: Layout.scaleX(35),
    justifyContent: 'space-between',
  },
  exitContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#D0D3D4',
    backgroundColor: '#F7F6F6',
  },

  exit: {
    paddingHorizontal: 30,
    width: '100%',
    paddingVertical: 20,
  },
  exitText: {
    fontSize: FontSize.medium,
    fontFamily: FontFamily.DiodrumArabic.Medium,
    textAlign: 'left',
    color: 'red',
  },
  messageLabel: {
    fontFamily: FontFamily.DiodrumArabic.Medium,
    color: '#d3d3d3',
    paddingBottom: 10,
  },
  errorLabel: {
    color: Colors.danger,
    fontWeight: 'bold',
    padding: 8,
    fontSize: 13,
    maxWidth: Layout.scaleX(425),
  },
});

export default Alert;
