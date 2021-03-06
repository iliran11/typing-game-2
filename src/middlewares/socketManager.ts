import * as socketIo from 'socket.io-client';
import AuthenticationManager from '../AuthenticationManager';
import {
  BOT_JOINED_ROOM,
  COMPETITOR_DELETION,
  COMPETITOR_HAS_FINISHED,
  COMPETITOR_JOINED_ROOM,
  COMPETITOR_LEFT,
  GAME_HAS_FINISHED,
  GAME_HAS_STARTED,
  GAME_HAS_TIMEOUT,
  GAME_IS_ACTIVE,
  NAVIGATE_RESULT,
  PLAYER_TYPING,
  REQUEST_TO_PLAY,
  RESTART_GAME,
  ROOM_ID_PARM,
  SCORE_BROADCAST,
  SET_GAME_LETTERS,
  SHOW_NOTIFICATION,
  SOCKET_HAS_CONNECTED,
  SOCKET_HAS_DISCONNECTED,
  TYPING_TEST_IS_ACTIVE,
  TYPING_TEST_SCORE_BROADCAST,
  YOU_JOINED_ROOM,
  ROOM_TYPE_PARAM,
  START_TYPING_TEST_GAME,
  LEAVE_GAME
} from '../constants';
import { PlayerGameStatus } from '../types/GameStatusType';
import {
  JoiningRoomResponse,
  MultiplayerRoomActive,
  RoomInfo,
  NotificationTypes,
  PlayerJoiningAction,
  PlayerSerialize,
  PlayerType,
  RoomType,
  RootState,
  ScoreBroadcastAction,
  TypingTestInitGame,
  GAME_IS_ACTIVE_PAYLOAD,
  StartTypingTestGameI
} from '../types/typesIndex';
import { EnviromentsManager } from 'src/middlewares/EnviromentsManager';

class SocketManager {
  private static instance: SocketManager;
  dispatch: any;
  history: any;
  socket: SocketIOClient.Socket;
  url: string = EnviromentsManager.getServerUrl();
  getState: () => RootState;
  static initiateSocketManager(
    dispatch: any,
    history: any,
    getState: () => RootState
  ) {
    SocketManager.instance = new SocketManager(dispatch, history, getState);
  }
  constructor(dispatch: any, history: any, getState: () => RootState) {
    this.dispatch = dispatch;
    this.history = history;
    this.getState = getState;
    this.socket = this.connect();
  }
  connect(): SocketIOClient.Socket {
    const token = AuthenticationManager.appToken || null;
    const query = token ? { token } : {};
    const socket = socketIo.connect(
      this.url,
      {
        query,
        reconnection: false
      }
    );
    this.socket = socket;
    this.socket.on(GAME_HAS_STARTED, this.gameHasStarted.bind(this));
    this.socket.on(
      COMPETITOR_JOINED_ROOM,
      this.competitorJoinedRoom.bind(this)
    );
    this.socket.on('connect', this.onConnect.bind(this));
    this.socket.on('disconnect', this.onDisconnect.bind(this));
    this.socket.on(SCORE_BROADCAST, this.scorebroadCast.bind(this));
    // this.socket.on(GAME_IS_ACTIVE, this.gameIsActive.bind(this));
    this.socket.on(GAME_IS_ACTIVE, this.gameIsActive.bind(this));
    this.socket.on(COMPETITOR_LEFT, this.competitorLeft.bind(this));
    this.socket.on(YOU_JOINED_ROOM, this.youJoinedRoom.bind(this));
    this.socket.on(
      COMPETITOR_HAS_FINISHED,
      this.competitorHasFinished.bind(this)
    );
    this.socket.on(TYPING_TEST_IS_ACTIVE, this.typingTestIsActive.bind(this));
    this.socket.on(COMPETITOR_DELETION, this.competitorDeletion.bind(this));
    this.socket.on(GAME_HAS_TIMEOUT, this.gameTimeout.bind(this));
    this.socket.on(NAVIGATE_RESULT, this.navigateResult.bind(this));
    return socket;
  }
  onConnect() {
    this.dispatch({
      type: SOCKET_HAS_CONNECTED
    });
  }
  onDisconnect() {
    this.dispatch({
      type: SOCKET_HAS_DISCONNECTED
    });
    this.dispatch({
      type: SHOW_NOTIFICATION,
      payload: {
        notificationType: NotificationTypes.SOCKET_DISCONNECT
      }
    });
  }
  youJoinedRoom(data: JoiningRoomResponse) {
    const { roomId, playersGameStatus, roomSize, isGameActive, myId } = data;
    this.dispatch({
      type: YOU_JOINED_ROOM,
      payload: {
        roomId,
        playersGameStatus,
        roomSize,
        isGameActive,
        myId
      }
    });
    const words = data.words;
    this.dispatch({
      type: SET_GAME_LETTERS,
      payload: {
        words
      }
    });
  }
  competitorJoinedRoom(playerObject: PlayerGameStatus) {
    const type =
      playerObject.type === PlayerType.human
        ? COMPETITOR_JOINED_ROOM
        : BOT_JOINED_ROOM;
    const action: PlayerJoiningAction = {
      type,
      payload: { ...playerObject }
    };
    this.dispatch(action);
  }
  gameHasStarted(payload: any) {
    const action = {
      type: GAME_HAS_STARTED,
      payload: {
        gameStartTimestamp: payload.startTimeStamp,
        roomId: payload.roomId
      }
    };
    this.dispatch(action);
  }
  scorebroadCast(data: PlayerGameStatus[]) {
    const state: RootState = this.getState();
    if (data[0].roomType === RoomType.MULTIPLAYER) {
      const action: ScoreBroadcastAction = {
        type: SCORE_BROADCAST,
        payload: {
          players: data,
          roomId: data[0].roomId
        }
      };
      this.dispatch(action);
    }
    if (data[0].roomType === RoomType.TYPING_TEST) {
      this.dispatch({
        type: TYPING_TEST_SCORE_BROADCAST,
        payload: data[0]
      });
    }
  }
  gameIsActive(data: GAME_IS_ACTIVE_PAYLOAD) {
    const state: RootState = this.getState();
    const payload: MultiplayerRoomActive = {
      roomId: data.roomId
    };
    this.dispatch({
      type: GAME_IS_ACTIVE,
      payload
    });
  }
  competitorLeft(data: PlayerSerialize) {
    this.dispatch(this.handleCompetitorleave(data));
  }
  handleCompetitorleave(data: any) {
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
      }
    };
  }
  competitorHasFinished(data: PlayerSerialize) {
    this.dispatch({
      type: COMPETITOR_HAS_FINISHED,
      payload: data
    });
  }
  typingTestIsActive(data: TypingTestInitGame) {
    const letters = data.words;
    this.dispatch({
      type: TYPING_TEST_IS_ACTIVE,
      payload: { ...data, letters }
    });
  }
  competitorDeletion(data: any) {
    this.dispatch({
      type: COMPETITOR_DELETION,
      payload: {
        playerId: data.playerId,
        roomId: data.roomId
      }
    });
  }
  gameTimeout(data: PlayerGameStatus[]) {
    this.dispatch({
      type: SHOW_NOTIFICATION,
      payload: {
        notificationType: NotificationTypes.GAME_TIMEOUT_NOTIFICATION
      }
    });
  }
  navigateResult(data: RoomInfo) {
    this.history.push(
      `/results?${ROOM_ID_PARM}=${data.roomId}&${ROOM_TYPE_PARAM}=${
        data.roomType
      }`
    );
  }
  reconnect() {
    const socket = this.connect();
    this.socket = socket;
  }
  emitTyping(typingInput: string, roomType: RoomType) {
    this.socket.emit(PLAYER_TYPING, { typingInput, roomType });
  }
  emitFinishedGame() {
    this.socket.emit(GAME_HAS_FINISHED);
  }
  emitRequestToPlay(roomType: RoomType) {
    const state: RootState = this.getState();
    this.socket.emit(REQUEST_TO_PLAY, roomType, state.myData.platform);
  }
  emitGameRestart() {
    this.socket.emit(RESTART_GAME);
  }
  emitStartTypingTest(roomId: string) {
    const payload: StartTypingTestGameI = { roomId };
    this.socket.emit(START_TYPING_TEST_GAME, payload);
  }
  emitLeaveGame(roomId: string, roomType: RoomType) {
    const payload: RoomInfo = { roomId, roomType };
    this.socket.emit(LEAVE_GAME, payload);
  }
  close() {
    this.socket.close();
  }
  static getInstance(): SocketManager {
    return SocketManager.instance;
  }
}
export { SocketManager };
