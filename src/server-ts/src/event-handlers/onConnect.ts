import * as io from 'socket.io';
import {
  CONNECT_SERVER_SUCCESS,
  GAME_HAS_FINISHED,
  LEAVE_GAME,
  PLAYER_TYPING,
  REQUEST_TO_PLAY,
  RESTART_GAME,
  START_TYPING_TEST_GAME
} from '../../../constants';
import {
  FacebookUserType,
  PlayerType,
  RoomInfo,
  RoomType,
  StartTypingTestGameI,
  DeviceType
} from '../../../types/typesIndex';
import LevelManager from '../models/LevelManager';
import RoomManager, {
  multiplayerRoomManager
} from '../models/MultiplayerRoomManager';
import PlayerManager from '../models/PlayerManager';
import { typingTestManager } from '../models/TypingTestManager';
import { getSocketAuthentication } from '../utilities';
import onDisconnect from './onDisconnect';
import onGameFinished from './onGameFinished';
import onGameRestart from './onGameRestart';
import playerTyping from './playerTyping';
const get = require('lodash.get');

const roomManager = RoomManager.getInstance();
const playerManager = PlayerManager.getInstance();
export default function onConnect(socket: io.Socket): void {
  // console.log(`connect- ${socket.client.id}`);
  socket.on('disconnect', () => {
    onDisconnect(socket);
  });
  socket.on(REQUEST_TO_PLAY, (roomType: RoomType, deviceType: DeviceType) => {
    const userData: FacebookUserType = getSocketAuthentication(socket);
    const levelManager = LevelManager.getInstance();
    const playerId = get(userData, ['id']);
    levelManager.getPlayerLevel(playerId).then(level => {
      // const player = new Player({socket, userData, level,roomType};
      // playerManager.addPlayer(player);
      if (roomType === RoomType.MULTIPLAYER) {
        multiplayerRoomManager.allocateToRoom(
          socket,
          userData,
          level,
          roomType,
          PlayerType.human,
          deviceType
        );
      }
      if (roomType === RoomType.TYPING_TEST) {
        typingTestManager.initGame(socket, userData, level, deviceType);
      }
      socket.emit(CONNECT_SERVER_SUCCESS);
    });
  });
  socket.on(PLAYER_TYPING, data => {
    playerTyping(socket, data);
  });
  socket.on(GAME_HAS_FINISHED, () => {
    onGameFinished(socket);
  });
  socket.on(RESTART_GAME, () => {
    onGameRestart(socket);
  });
  socket.on(START_TYPING_TEST_GAME, (data: StartTypingTestGameI) => {
    const room = typingTestManager.getRoom(socket);
    room.startGame();
  });
  socket.on(LEAVE_GAME, (payload: RoomInfo) => {
    onDisconnect(socket);
  });
}
