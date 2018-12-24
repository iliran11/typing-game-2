import { GameRecordsModel } from '../../../../types';

const mongoose = require('mongoose');
export const GameRecordSchema = mongoose.Schema({
  playerId: String,
  score: Number,
  completedPercentage: Number,
  finishedTimestamp: Number,
  gameDuration: Number,
  accuracy: Number
});

const GameRecordsSchema = mongoose.Schema({
  results: [GameRecordSchema],
  gameInstanceId: String
});

GameRecordsSchema.statics.getRecordsByRoomId = function(
  roomId: string
): Promise<GameRecordsModel[]> {
  return new Promise((resolve, reject) => {
    this.find({ gameInstanceId: roomId })
      .then((result: GameRecordsModel[]) => {
        resolve(result);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export { GameRecordsSchema };
