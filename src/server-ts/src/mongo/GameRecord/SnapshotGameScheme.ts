import { GameRecordsModel, PlayerGameStatus } from '../../../../types';
import { PlayerScoreScheme } from '../PlayerScore/PlayerScoreScheme';
const mongoose = require('mongoose');

const SnapshotGameScheme = mongoose.Schema({
  results: [PlayerScoreScheme],
  gameInstanceId: String,
  gameTickSequenceId: Number
});

SnapshotGameScheme.statics.getRecordsByRoomId = function(
  roomId: string
): Promise<GameRecordsModel[]> {
  return new Promise((resolve, reject) => {
    this.find({ gameInstanceId: roomId })
      .sort({ gameTickSequenceId: 1 })
      .exec()
      .then((result: GameRecordsModel[]) => {
        resolve(result);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export { SnapshotGameScheme };
