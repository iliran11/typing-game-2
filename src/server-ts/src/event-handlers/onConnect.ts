import * as io from 'socket.io';
import RoomManager from '../classes/MultiplayerRoomManager';
import { typingTestManager } from '../classes/TypingTestManager';
import PlayerManager from '../classes/PlayerManager';
import Player from '../classes/Player';
import onDisconnect from './onDisconnect';
import { multiplayerRoomManager } from '../classes/MultiplayerRoomManager';
import playerTyping from './playerTyping';
import onGameFinished from './onGameFinished';
import onGameRestart from './onGameRestart';
import {
  PLAYER_TYPING,
  CONNECT_SERVER_SUCCESS,
  GAME_HAS_FINISHED,
  RESTART_GAME,
  REQUEST_TO_PLAY,
  START_TYPING_TEST_GAME,
  LEAVE_GAME
} from '../../../constants';
import {
  FacebookUserType,
  RoomType,
  PlayerType,
  StartTypingTestGameI,
  RoomInfo
} from '../../../types/typesIndex';
import { getSocketAuthentication } from '../utilities';
import LevelManager from '../classes/LevelManager';
const get = require('lodash.get');

const roomManager = RoomManager.getInstance();
const playerManager = PlayerManager.getInstance();
export default function onConnect(socket: io.Socket): void {
  // console.log(`connect- ${socket.client.id}`);
  socket.on('disconnect', () => {
    onDisconnect(socket);
  });
  socket.on(REQUEST_TO_PLAY, (roomType: RoomType) => {
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
          PlayerType.human
        );
      }
      if (roomType === RoomType.TYPING_TEST) {
        typingTestManager.initGame(
          socket,
          userData,
          level,
          roomType,
          PlayerType.human
        );
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
