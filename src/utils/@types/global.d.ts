import { Services } from '../loaders/ServicesLoader';
import { ApplicationInjectedStore } from '../loaders/StoresLoader';

declare global {
  namespace NodeJS {
    interface Global {
      stores: ApplicationInjectedStore;
      services: Services;
    }
  }

  interface Array<T> {
    last: () => T;
  }
}
