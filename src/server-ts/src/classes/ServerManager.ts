import * as io from 'socket.io';
import onConnect from '../event-handlers/onConnect';
import { Socket } from 'net';

export default class ServerManager {
  private server: io.Server;
  private static instance: ServerManager;

  private constructor(expressInstance) {
    this.server = io(expressInstance);
    this.server.on('connection', onConnect);
    this.server.use((socket, next) => {
      console.log(socket.handshake.query);
      next(new Error('Authentication error'));
    });
  }
  get serverObject() {
    return this.server;
  }
  static getInstance(expressInstance?) {
    if (!ServerManager.instance) {
      ServerManager.instance = new ServerManager(expressInstance);
    }
    return ServerManager.instance;
  }
}
