const mongoose = require('mongoose');

const TypingScheme = mongoose.Schema({
  typedLetter: String,
  playerId: String,
  gameId: String,
  gameTimeStamp: Number
});

// get typing of a single player in a specific game.
TypingScheme.statics.getTypingsOfPlayerInGame = function(
  gameId: string,
  playerId: string
) {
  return new Promise((resolve, reject) => {
    this.find({ gameId, playerId })
      .sort({ gameTimeStamp: 1 })
      .then(result => {
        resolve(result);
      })
      .catch(err => reject(err));
  });
};

export default TypingScheme;
