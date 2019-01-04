import { PlayerGameStatus } from '../../../../types';
const mongoose = require('mongoose');

export const PlayerScoreScheme = mongoose.Schema({
  playerId: String,
  score: Number,
  completedPercentage: Number,
  finishedTimestamp: Number,
  gameDuration: Number,
  accuracy: Number,
  id: String,
  isFinished: Boolean,
  type: String,
  name: String,
  numberOfTypings: Number,
  numberOfWords: Number,
  numberOfLetters: Number,
  rankAtFinish: Number
});

PlayerScoreScheme.statics.totalWords = function(
  playerId: string,
  field: string
): Promise<number> {
  return new Promise((resolve, reject) => {
    this.aggregate([
      {
        $match: { id: playerId }
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: `$${field}`
          }
        }
      }
    ])
      .then(result => {
        if (result.length === 0) {
          resolve(-1);
        }
        resolve(result[0].total);
      })
      .catch(err => {
        reject(err);
      });
  });
};

PlayerScoreScheme.statics.maxWpmOfField = function(
  playerId: string,
  field: string
): Promise<number> {
  return new Promise((resolve, reject) => {
    this.find({ id: playerId })
      .sort({ [field]: -1 })
      .limit(1)
      .then((result: PlayerGameStatus[]) => {
        if (result.length === 0) {
          resolve(-1);
        }
        resolve(result[0][field]);
      })
      .catch(err => reject(err));
  });
};
