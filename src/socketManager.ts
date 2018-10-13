import * as socketIo from "socket.io-client";
import {
  JoiningRoomResponse,
  ServerConnectSuccessPayload,
  PlayerSerialize
} from "./types";
import {
  YOU_JOINED_ROOM,
  CONNECT_SERVER_SUCCESS,
  COMPETITOR_JOINED_ROOM
} from "./constants";

const socketManager: any = {
  initSocket(dispatch: any) {
    this.socket = socketIo.connect("http://localhost:4000");
    this.dispatch = dispatch;
    this.socket.on(
      CONNECT_SERVER_SUCCESS,
      (data: ServerConnectSuccessPayload) => {
        this.dispatch({
          type: CONNECT_SERVER_SUCCESS,
          payload: data
        });
      }
    );
    this.socket.on(YOU_JOINED_ROOM, (data: JoiningRoomResponse) => {
      const playersObject = data.players.reduce(
        (accumulator, player: PlayerSerialize) => {
          accumulator[player.id] = player;
          return accumulator;
        },
        {}
      );
      this.dispatch({
        type: YOU_JOINED_ROOM,
        payload: {
          roomId: data.roomId,
          words: data.words,
          players: playersObject
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
    //   this.socket.on(SCORES_BROADCAST, data => {
    //     updateScores(data, dispatch);
    //   });
    // },
    // emitEvent(eventName, data) {
    //   this.socket.emit(eventName, data);
    // }
  }
};

export default socketManager;
