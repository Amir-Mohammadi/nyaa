import { action, computed, observable } from 'mobx';
import { KeyboardTypeOptions } from 'react-native';
import Logger from '../utils/Logger';
import { ValidateResult } from '../utils/validator';
import { Store } from './core/Store';

var logger = new Logger('NotificationStore');

export enum DialogStatus {
  CONFIRM,
  CANCEL,
}

export interface QuestionModel {
  bodyMessage: string;
  inputValuator?: (value: string) => ValidateResult;
  onConfirm: (value: string) => Promise<void>;
  placeHolder?: string;
  defaultValue?: string;
  inputPreprocessor?: (input: string) => string;
  inputType?: DialogType;
  keyboardType?: KeyboardTypeOptions;
}

export interface DialogResult {
  status: DialogStatus;
}

export enum DialogType {
  CONFIRM,
  ALERT,
  QUESTION,
}

export class DialogStore extends Store {
  @observable private _visible: boolean = false;
  @observable private _type: DialogType = DialogType.ALERT;
  @observable private _loading: boolean = false;
  @observable private _inputValue: string = '';
  @observable keyboardType: KeyboardTypeOptions = 'default';
  @observable public bodyMessage: string = '';
  @observable public placeHolder: string = '';
  @observable inputErrorMessage: string = '';

  @computed get visible() {
    return this._visible;
  }

  @computed get inputValue() {
    return this._inputValue;
  }

  @computed get type() {
    return this._type;
  }

  @computed get loading() {
    return this._loading;
  }

  @action private setNotificationVisible = (visible: boolean) => {
    this._visible = visible;
  };

  @action public onConfirm = () => {};

  @action public onCancel = () => {};

  @action public onRequestClose = () => {};

  @action public onQuestionInputValueChange = (value: string) => {
    this._inputValue = value;
  };

  @action public askQuesting = (question: QuestionModel) => {
    return new Promise<DialogResult>(resolve => {
      this._initializeTheDialog();
      this.bodyMessage = question.bodyMessage;
      this.placeHolder = question.placeHolder ?? '';
      this._inputValue = question.defaultValue ?? '';
      this.keyboardType = question.keyboardType ?? 'default';
      this._type = DialogType.QUESTION;

      this.onConfirm = () => {
        var inputValue = this._inputValue;

        if (question.inputPreprocessor) {
          inputValue = question.inputPreprocessor(this._inputValue);
        }

        if (question.inputValuator) {
          var validate = question.inputValuator(inputValue);
          if (!validate.isValid) {
            this.inputErrorMessage = validate.errorMessage!;
            return;
          }
        }

        this._loading = true;

        question
          .onConfirm(inputValue)
          .then(() => {
            this.setNotificationVisible(false);
            resolve({ status: DialogStatus.CONFIRM });
            this._loading = false;
          })
          .catch(() => this.onCancel());
      };

      this.onRequestClose = () => {};

      this.onCancel = () => {
        this.setNotificationVisible(false);
        resolve({ status: DialogStatus.CANCEL });
      };
    });
  };

  @action private _initializeTheDialog = () => {
    this.setNotificationVisible(true);
    this._loading = false;
    this._inputValue = '';
    this.inputErrorMessage = '';
  };

  @action public showAlert = (bodyMessage: string) => {
    return new Promise<DialogResult>(resolve => {
      this._initializeTheDialog();
      this.bodyMessage = bodyMessage;
      this._type = DialogType.ALERT;

      this.onConfirm = () => {
        this.setNotificationVisible(false);
        resolve({ status: DialogStatus.CONFIRM });
      };

      this.onRequestClose = () => {
        this.setNotificationVisible(false);
        resolve({ status: DialogStatus.CANCEL });
      };

      this.onCancel = () => {};
    });
  };

  @action public askConfirm = (
    bodyMessage: string,
    onConfirm: () => Promise<void> = () => new Promise(resolve => resolve()),
  ) => {
    return new Promise<DialogResult>(resolve => {
      this._initializeTheDialog();
      this.bodyMessage = bodyMessage;
      this._type = DialogType.CONFIRM;

      this.onConfirm = () => {
        this._loading = true;
        onConfirm()
          .then(() => {
            this.setNotificationVisible(false);
            this._loading = false;
            resolve({ status: DialogStatus.CONFIRM });
          })
          .catch(() => this.onCancel());
      };

      this.onCancel = () => {
        this.setNotificationVisible(false);
        resolve({ status: DialogStatus.CANCEL });
      };

      this.onRequestClose = () => {};
    });
  };
}

export interface InjectedDialogStore {
  dialog: DialogStore;
}
