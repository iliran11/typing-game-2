import { roomSummaryDb } from '../mongo/RoomSummaryDb/RoomSummaryDb';
import { GameRecords } from '../mongo/GameRecord/GameRecordModel';
import { TypingModel } from '../mongo/Typing/TypingModel';
import { ROOM_ID_PARM, PLAYER_ID_PARAM } from '../../../constants';
import { ReplayEndPointResponseI } from '../../../types';
const isNil = require('lodash.isnil');

export default function GamesHistoryController(req, res) {
  const roomIdParam = req.query[ROOM_ID_PARM];
  const playerIdParam = req.query[PLAYER_ID_PARAM];
  if (isNil(roomIdParam) || isNil(playerIdParam)) {
    res.status(400).send({
      message: 'roomId or PlayerId not supplied'
    });
    return;
  }
  const gameRecords = GameRecords.getRecordsByRoomId(roomIdParam);
  const gameInfo = roomSummaryDb.getGameInfoByGameId(roomIdParam);
  const gameTyping = TypingModel.getTypingsOfPlayerInGame(
    roomIdParam,
    playerIdParam
  );
  Promise.all([gameRecords, gameInfo, gameTyping]).then(values => {
    const response: ReplayEndPointResponseI = {
      gameRecords: values[0],
      gameInfo: values[1],
      gameTyping: values[2]
    };
    res.send(response);
  });
}
