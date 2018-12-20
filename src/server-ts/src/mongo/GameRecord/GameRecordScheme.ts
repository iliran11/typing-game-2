const mongoose = require('mongoose');
export const GameRecordSchema = mongoose.Schema({
  playerId: String,
  score: Number,
  completedPercentage: Number,
  finishedTimestamp: Number,
  gameDuration: Number,
  accuracy: Number
});

export const GameRecordsSchema = mongoose.Schema({
  results: [GameRecordSchema],
  gameInstanceId: String
});

export default GameRecordsSchema;
