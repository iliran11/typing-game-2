import * as io from "socket.io";
import RoomManager from "../classes/RoomManager";
import PlayerManager from "../classes/PlayerManager";
import Player from "../classes/Player";
import onDisconnect from "./onDisconnect";
import broadcastName from "./broadcastName";
import sharedCode from "../../../client-server-code/client-server-code";
import playerTyping from "./playerTyping";

const {
  constants: { BROADCAST_NAME, PLAYER_TYPING }
} = sharedCode;

const roomManager = RoomManager.getInstance();
const playerManager = PlayerManager.getInstance();

export default function onConnect(socket: io.Socket): void {
  console.log(`connect - ${socket.client.id}`);
  const player = new Player(socket);
  playerManager.addPlayer(player);

  socket.on("disconnect", () => {
    onDisconnect(socket);
  });
  socket.on(BROADCAST_NAME, data => {
    broadcastName(socket, data);
  });
  socket.on(PLAYER_TYPING, data => {
    playerTyping(socket, data);
  });
}
