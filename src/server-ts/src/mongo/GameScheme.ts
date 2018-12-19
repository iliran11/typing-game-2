var mongoose = require('mongoose');

const GameScheme = mongoose.Schema({
  letters: Array,
  players: Array,
  id: String
});

export default GameScheme;
