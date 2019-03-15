import ServerManager from './models/ServerManager';
const image2base64 = require('image-to-base64');

export function getServer() {
  return ServerManager.getInstance().serverObject;
}
export function emitToRoom(roomName, eventName, data?) {
  getServer()
    .in(roomName)
    .emit(eventName, data);
}

export function getSocketAuthentication(socket: any) {
  return socket.handshake.userData || null;
}

export function getBase64FacebookPic(url: string) {
  return new Promise(resolve => {
    image2base64(url) // you can also to use url
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        throw error;
      });
  });
}
