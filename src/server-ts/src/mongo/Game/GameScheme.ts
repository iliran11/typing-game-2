import { GameRecordsSchema } from '../GameRecord/GameRecordScheme';
var mongoose = require('mongoose');

const GameScheme = mongoose.Schema({
  letters: Array,
  players: Array,
  finalResult: GameRecordsSchema,
  _id: String
});

export default GameScheme;
