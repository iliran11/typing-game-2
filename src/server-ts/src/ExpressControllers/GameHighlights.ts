import { GameRecord } from '../mongo/GameRecord/GameRecordModel';
import { PLAYER_ID_PARAM } from '../../../constants';
import { PlayerGameStatus, HighlightsI } from '../../../types';

export default function GameHighlights(req, res) {
  const highlights: HighlightsI = {};
  function getUsedRoomIds() {
    // @ts-ignore
    let roomIds = [];
    const values = Object.values(highlights).forEach(value => {
      if (value.roomId) {
        roomIds.push(value.roomId);
      }
    });
    return roomIds;
  }
  const playerId = req.query[PLAYER_ID_PARAM];
  if (!playerId) {
    res.send(400);
    return;
  }
  const maxSpeed = new Promise((resolve, reject) => {
    GameRecord.getMaxOneDocumentByQuery(
      {
        id: playerId
      },
      { score: -1 }
    )
      .then((result: PlayerGameStatus) => {
        if (result) {
          highlights.highestSpeed = { roomId: result.roomId, data: result };
        }
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });
  const firstPlace = new Promise((resolve, reject) => {
    maxSpeed.then(result => {
      GameRecord.getMaxOneDocumentByQuery(
        { id: playerId, roomId: { $nin: getUsedRoomIds() }, rankAtFinish: 1 },
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
      GameRecord.getMaxOneDocumentByQuery(
        { id: playerId, roomId: { $nin: roomsArray } },
        { gameDuration: -1 }
      ).then(result => {
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
  Promise.all([maxSpeed, firstPlace, fastestGame]).then(values => {
    res.send(highlights);
  });
}
