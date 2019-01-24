import { GameRecordsModel, PlayerGameStatus } from '../../../../types';
import { GameRecord } from './GameRecordModel';
import { resolve } from 'url';
import { rejects } from 'assert';

//TODO: change name to game record schema;
const mongoose = require('mongoose');
export const GameRecordSchema = mongoose.Schema({
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
  rankAtFinish: Number,
  roomId: String
});

const GameRecordsSchema = mongoose.Schema({
  results: [GameRecordSchema],
  gameInstanceId: String,
  gameTickSequenceId: Number
});

GameRecordSchema.statics.maxWpmOfField = function(
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

GameRecordSchema.statics.totalWords = function(
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
          resolve(0);
        }
        resolve(result[0].total);
      })
      .catch(err => {
        reject(err);
      });
  });
};
GameRecordSchema.statics.getMaxOneDocumentByQuery = function(
  queryObject,
  sortObject
): Promise<PlayerGameStatus | null> {
  return new Promise((resolve, reject) => {
    this.find(queryObject)
      .sort(sortObject)
      .then((result: PlayerGameStatus[]) => {
        if (result.length === 0) {
          resolve(null);
        }
        resolve(result[0]);
      })
      .catch(err => {
        reject(err);
      });
  });
};
GameRecordSchema.statics.getRankings = function() {
  return new Promise((resolve, reject) => {
    this.aggregate([
      {
        $group: {
          _id: '$id',
          maxWpm: { $max: '$score' }
        }
      },
      {
        $sort: {
          maxWpm: -1
        }
      }
    ]).then(result => {
      resolve(result);
    });
  });
};

GameRecordsSchema.statics.getRecordsByRoomId = function(
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

export { GameRecordsSchema };
