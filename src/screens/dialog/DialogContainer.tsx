import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import Alert from '../../components/Alert';
import { InjectedDialogStore } from '../../stores/NotificationStore';

export type DialogContainerProps = InjectedDialogStore;

@inject('dialog')
@observer
class DialogContainer extends Component<DialogContainerProps> {
  render() {
    return (
      <Alert
        type={this.props.dialog.type}
        BodyText={this.props.dialog.bodyMessage}
        confirm={() => {
          this.props.dialog.onConfirm();
        }}
        visible={this.props.dialog.visible}
        cancel={() => {
          this.props.dialog.onCancel();
        }}
        loading={this.props.dialog.loading}
        onRequestClose={() => {
          this.props.dialog.onRequestClose();
        }}
        input={{
          onChange: (v) => this.props.dialog.onQuestionInputValueChange(v),
          value: this.props.dialog.inputValue,
          errorMessage: this.props.dialog.inputErrorMessage,
          placeHolder: this.props.dialog.placeHolder,
          keyboardType: this.props.dialog.keyboardType,
        }}
      />
    );
  }
}

export default DialogContainer as any;
