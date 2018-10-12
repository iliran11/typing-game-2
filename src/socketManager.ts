import * as socketIo from "socket.io-client";
import { JoiningRoomResponse,ServerConnectSuccessPayload } from "./types";
import {
  YOU_JOINED_ROOM,
  BROADCAST_NAME,
  CONNECT_SERVER_SUCCESS
} from "./constants";

const socketManager: any = {
  initSocket(dispatch: any) {
    this.socket = socketIo.connect("http://localhost:4000");
    this.dispatch = dispatch;
    this.socket.on(CONNECT_SERVER_SUCCESS, (data: ServerConnectSuccessPayload) => {
      this.dispatch({
        type: CONNECT_SERVER_SUCCESS,
        payload: data
      });
    });
    this.socket.on(YOU_JOINED_ROOM, (data: JoiningRoomResponse) => {
      this.dispatch({
        type: YOU_JOINED_ROOM,
        payload: data
      });
    });
    //   this.socket.on(COMPETITOR_JOINED_GAME, playerObject => {
    //     addCompetitor(playerObject, dispatch);
    //   });
    //   this.socket.on(SCORES_BROADCAST, data => {
    //     updateScores(data, dispatch);
    //   });
    // },
    // emitEvent(eventName, data) {
    //   this.socket.emit(eventName, data);
    // }
  },
  broadcastName(name: string) {
    this.socket.emit(BROADCAST_NAME, { playerName: "liran" });
  }
};

export default socketManager;
