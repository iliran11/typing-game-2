import ServerManager from './models/ServerManager';
const image2base64 = require('image-to-base64');
import { PlayerType } from '../../types/typesIndex';
import {
  HumanPlayer,
  LinearBotPlayer,
  BasePlayersOptions,
  HumanPlayerOptions
} from './models/Player/players-index';

export function getServer() {
  return ServerManager.getInstance().serverObject;
}
export function emitToRoom(roomName, eventName, data?) {
  getServer()
    .in(roomName)
    .emit(eventName, data);
}

export function getSocketAuthentication(socket: any) {
  return socket.handshake.userData || null;
}

export function getBase64FacebookPic(url: string) {
  return new Promise(resolve => {
    image2base64(url) // you can also to use url
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        throw error;
      });
  });
}

export function PlayerFactory(
  playerType: PlayerType.bot,
  options: BasePlayersOptions
): LinearBotPlayer;
export function PlayerFactory(
  playerType: PlayerType.human,
  options: HumanPlayerOptions
);
export function PlayerFactory(playerType: PlayerType, options) {
  if (playerType === PlayerType.human) {
    return new HumanPlayer(options);
  }
  if (playerType === PlayerType.bot) {
    return new LinearBotPlayer(options);
  }
  throw new Error('unknown player type!');
}
