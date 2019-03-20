import { Enviroments } from './types';

class NetworkManager {
  private static instance: NetworkManager;
  private constructor() {}
  get enviroment() {
    if (process.env.REACT_APP_ENV) {
      return process.env.REACT_APP_ENV;
    } else {
      Enviroments.LOCAL;
    }
  }
  prefixedPath(endpoint: string): string {
    switch (this.enviroment) {
      case Enviroments.LOCAL:
        return `/${endpoint}`;
      case Enviroments.STAGING:
        return `https://typing-dev-2.herokuapp.com/${endpoint}`;
      case Enviroments.TEST:
        return `https://calm-ravine-85126.herokuapp.com/${endpoint}`;
      default:
        return '/';
    }
  }
  static getInstance() {
    if (!NetworkManager.instance) {
      NetworkManager.instance = new NetworkManager();
    }
    return NetworkManager.instance;
  }
}

const networkManager = NetworkManager.getInstance();

export { networkManager };
