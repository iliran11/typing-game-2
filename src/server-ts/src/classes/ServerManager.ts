import * as io from "socket.io";
import onConnect from "../event-handlers/onConnect";

export default class ServerManager {
  private server: io.Server;
  private static instance: ServerManager;

  private constructor() {
    this.server = io.listen(4000);
    this.server.on("connection", onConnect);
  }
  get serverObject() {
    return this.server;
  }
  static getInstance() {
    if (!ServerManager.instance) {
      ServerManager.instance = new ServerManager();
    }
    return ServerManager.instance;
  }
}
