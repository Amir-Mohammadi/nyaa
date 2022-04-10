export abstract class Store {
  private static localRegistry: any = {};

  public static createRegistry<T>(stores: T): any {
    Object.keys(stores).forEach((key) => {
      //@ts-ignore
      Store.localRegistry[stores[key].constructor.name] = stores[key];
    });
    return stores;
  }
}
