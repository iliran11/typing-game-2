import { DeviceType, RoomType, HighlightsI } from '../../../types';
import { userGameHistoryDb } from '../mongoIndex';

export async function HighlightsController(
  playerId,
  roomType: RoomType,
  deviceType: DeviceType
) {
  // @ts-ignore
  const highlights: HighlightsI = {};
  function getUsedRoomIds() {
    // @ts-ignore
    let roomIds = [];
    // @ts-ignore
    const values = Object.values(highlights).forEach(value => {
      if (value.roomId) {
        // @ts-ignore
        roomIds.push(value.roomId);
      }
    });
    return roomIds;
  }
  const maxSpeed = new Promise((resolve, reject) => {
    userGameHistoryDb
      .getMaxOneDocumentByQuery(
        {
          playerId,
          roomType,
          deviceType
        },
        { score: -1 }
      )
      .then(result => {
        if (result) {
          highlights.highestSpeed = {
            roomId: result.roomId,
            data: result
          };
        }
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });
  const firstPlace = new Promise((resolve, reject) => {
    maxSpeed.then(result => {
      userGameHistoryDb
        .getMaxOneDocumentByQuery(
          {
            playerId,
            roomId: { $nin: getUsedRoomIds() },
            rank: 1,
            deviceType,
            roomType
          },
          { rank: -1 }
        )
        .then(result => {
          if (result) {
            highlights.firstPlace = { roomId: result.roomId, data: result };
          }
          resolve();
        })
        .catch(err => {
          reject();
        });
    });
  });
  const fastestGame = new Promise((resolve, reject) => {
    firstPlace.then(result => {
      const roomsArray = getUsedRoomIds();
      userGameHistoryDb
        .getMaxOneDocumentByQuery(
          { playerId, roomId: { $nin: roomsArray }, roomType, deviceType },
          { gameDuration: -1 }
        )
        .then(result => {
          if (result) {
            highlights.fastestGame = {
              roomId: result.roomId,
              data: result
            };
          }
          resolve();
        });
    });
  });
  await Promise.all([maxSpeed, firstPlace, fastestGame]);
  // we are sending a map to be prepared for sending highlights of multiple players.
  return highlights;
}
