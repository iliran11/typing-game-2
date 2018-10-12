import * as socketIo from "socket.io-client";

export default class SocketManager {
  public static getInstance() {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager();
    }
    return SocketManager.instance;
  }

  private static instance: SocketManager;
  private socket: any;

  
  private constructor() {
    this.initSocket();
  }
  private initSocket() {
    this.socket = socketIo.connect("http://localhost:4000");
    this.socket;

  }
}
