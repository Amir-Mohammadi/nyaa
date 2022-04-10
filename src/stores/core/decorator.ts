import { inject } from 'mobx-react';
import { Component } from 'react';
import { ApplicationInjectedStore } from '../../utils/loaders/StoresLoader';

export class ComponentWithStore<IStores, IProps = {}, IStates = {}> extends Component<
  IProps,
  IStates
> {
  public get stores() {
    return this.props as any as IStores;
  }
}
export const connect = (...args: Array<keyof ApplicationInjectedStore>) => inject(...args);
