import ServerManager from './classes/ServerManager'

export function getServer() {
  return ServerManager.getInstance().serverObject;
}
export function emitToRoom(roomName,eventName,data?) {
  getServer()
    .in(roomName)
    .emit(eventName,data);
}