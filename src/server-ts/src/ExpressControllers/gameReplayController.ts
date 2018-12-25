import { GameRecords } from '../mongo/GameRecord/GameRecordModel';
import { ROOM_ID_PARM } from '../../../constants';
import { GameRecordsModel } from '../../../types';

export default function GamesHistoryController(req, res) {
  const searchParamaer = req.query[ROOM_ID_PARM];
  GameRecords.getRecordsByRoomId(searchParamaer)
    .then((result: GameRecordsModel[]) => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
      res.send(500);
    });
}
