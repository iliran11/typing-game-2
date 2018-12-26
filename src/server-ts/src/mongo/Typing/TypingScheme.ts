const mongoose = require('mongoose');

export const TypingScheme = mongoose.Schema({
  typedLetter: String,
  playerId: String,
  gameId: String,
  gameTimeStamp: Number
});
