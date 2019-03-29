import { EnviromentsManager } from './middlewares/EnviromentsManager';

class NetworkManager {
  private static instance: NetworkManager;
  prefixedPath(endpoint: string): string {
    return EnviromentsManager.prefixByEnviroment(endpoint);
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
