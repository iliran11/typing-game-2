import * as socketIo from 'socket.io-client';
import {
  JoiningRoomResponse,
  ServerConnectSuccessPayload,
  PlayerSerialize,
  PlayerType
} from './types';
import {
  YOU_JOINED_ROOM,
  CONNECT_SERVER_SUCCESS,
  COMPETITOR_JOINED_ROOM,
  BOT_JOINED_ROOM,
  PLAYER_TYPING,
  SET_GAME_LETTERS,
  SCORE_BROADCAST,
  GAME_HAS_STARTED,
  COMPETITOR_LEFT,
  COMPETITOR_DELETION,
  GAME_HAS_FINISHED,
  COMPETITOR_HAS_FINISHED
} from './constants';

const socketManager: any = {
  initSocket(dispatch: any) {
    this.socket = socketIo.connect('http://localhost:4001');
    // this.socket = socketIo.connect('https://typing-game-dev.herokuapp.com/');
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
          players: data.players,
          roomSize: data.roomSize,
          isGameActive: data.isGameActive
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
      const type =
        playerObject.type === PlayerType.human
          ? COMPETITOR_JOINED_ROOM
          : BOT_JOINED_ROOM;
      this.dispatch({
        type,
        payload: {
          id: playerObject.id,
          type: playerObject.type
        }
      });
    });
    this.socket.on(GAME_HAS_STARTED, (payload: any) => {
      this.dispatch({
        type: GAME_HAS_STARTED,
        payload: {
          gameStartTimestamp: payload.startTimeStamp
        }
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
    this.socket.on(COMPETITOR_LEFT, (data: PlayerSerialize) => {
      this.dispatch(handleCompetitorleave(data));
    });
    this.socket.on(COMPETITOR_HAS_FINISHED, (data: PlayerSerialize) => {
      this.dispatch({
        type: COMPETITOR_HAS_FINISHED,
        payload: data
      });
    });
  },
  emitTyping(typingInput: string) {
    this.socket.emit(PLAYER_TYPING, { typingInput });
  },
  emitFinishedGame() {
    this.socket.emit(GAME_HAS_FINISHED);
  }
};

function handleCompetitorleave(data: any) {
  return function(dispatch: any, getState: any) {
    const state = getState();
    if (state.serverStatus.isGameActive) {
      dispatch({
        type: COMPETITOR_LEFT,
        payload: {
          playerId: data.id
        }
      });
    } else {
      dispatch({
        type: COMPETITOR_DELETION,
        payload: {
          playerId: data.id
        }
      });
    }
  };
}

export default socketManager;
