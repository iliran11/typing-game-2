import * as socketIo from 'socket.io-client';
import {
  JoiningRoomResponse,
  ServerConnectSuccessPayload,
  PlayerSerialize
} from './types';
import {
  YOU_JOINED_ROOM,
  CONNECT_SERVER_SUCCESS,
  COMPETITOR_JOINED_ROOM,
  PLAYER_TYPING,
  SET_GAME_LETTERS,
  SCORE_BROADCAST,
  GAME_HAS_STARTED
} from './constants';

const socketManager: any = {
  initSocket(dispatch: any) {
    this.socket = socketIo.connect('http://localhost:4000');
    this.dispatch = dispatch;
    this.socket.on(
      CONNECT_SERVER_SUCCESS,
      (data: ServerConnectSuccessPayload) => {
        this.dispatch({
          type: CONNECT_SERVER_SUCCESS,
          payload: { myId: data.myId }
        });
      }
    );
    this.socket.on(YOU_JOINED_ROOM, (data: JoiningRoomResponse) => {
      this.dispatch({
        type: YOU_JOINED_ROOM,
        payload: {
          roomId: data.roomId,
          players: data.players
        }
      });
      this.dispatch({
        type: SET_GAME_LETTERS,
        payload: {
          letters: data.letters
        }
      });
    });
    this.socket.on(COMPETITOR_JOINED_ROOM, (playerObject: PlayerSerialize) => {
      this.dispatch({
        type: COMPETITOR_JOINED_ROOM,
        payload: {
          id: playerObject.id,
          name: playerObject.name
        }
      });
    });
    this.socket.on(GAME_HAS_STARTED, () => {
      this.dispatch({
        type: GAME_HAS_STARTED
      });
    });
    this.socket.on(SCORE_BROADCAST, (data: any) => {
      this.dispatch({
        type: SCORE_BROADCAST,
        payload: {
          players: data
        }
      });
    });
  },
  emitTyping(typingInput: string) {
    this.socket.emit(PLAYER_TYPING, { typingInput });
  }
};

export default socketManager;
