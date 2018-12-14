import * as io from 'socket.io';
import onConnect from '../event-handlers/onConnect';
import { Socket } from 'net';
const jwt = require('jsonwebtoken');

export default class ServerManager {
  private server: io.Server;
  private static instance: ServerManager;

  private constructor(expressInstance) {
    this.server = io(expressInstance);
    this.server.on('connection', onConnect);
    this.server.use((socket, next) => {
      const token = socket.handshake.query.token;
      jwt.verify(token, process.env.SERVER_AUTH_SECRET, (err, decoded) => {
        socket.handshake.userData = decoded
        return next();
        if (err) {
        }
      });
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
