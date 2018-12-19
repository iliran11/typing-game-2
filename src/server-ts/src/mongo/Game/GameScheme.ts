var mongoose = require('mongoose');

const GameScheme = mongoose.Schema({
  letters: Array,
  players: Array,
  _id: String
});

export default GameScheme;
