import * as io from 'socket.io';
import onConnect from '../event-handlers/onConnect';
import { User } from '../mongo/User/UserModel';
import { FacebookUserType } from '../../../types';
const jwt = require('jsonwebtoken');

export default class ServerManager {
  private server: io.Server;
  private static instance: ServerManager;

  private constructor(expressInstance) {
    this.server = io(expressInstance);
    this.server.on('connection', onConnect);
    this.server.use((socket, next) => {
      const token = socket.handshake.query.token;
      console.log(token);
      if (token) {
        jwt.verify(
          token,
          process.env.SERVER_AUTH_SECRET,
          (err, decoded: FacebookUserType) => {
            User.findById(decoded.id)
              .then(user => {
                if (user) {
                  // updte the handshake as logged in user only if found in Users collection in mongo.
                  socket.handshake.userData = decoded;
                  return next();
                } else {
                  return next();
                }
              })
              .catch(err => {
                console.error(err);
                return next();
              });
          }
        );
      } else {
        // if no token - just proceed;
        return next();
      }
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
