import ServerManager from './classes/ServerManager';

export function getServer() {
  return ServerManager.getInstance().serverObject;
}
export function emitToRoom(roomName, eventName, data?) {
  getServer()
    .in(roomName)
    .emit(eventName, data);
}

export function getSocketAuthentication(socket: any) {
  return socket.handshake.userData || {};
}
