import { GameRecordsSchema } from '../GameRecord/GameRecordScheme';
import { GameModelInterface } from '../../../../types';
var mongoose = require('mongoose');

const GameScheme = mongoose.Schema({
  letters: Array,
  players: Array,
  finalResult: GameRecordsSchema,
  _id: String
});

GameScheme.statics.getGamesByUserId = function(
  id: string
): Promise<GameModelInterface> {
  return new Promise((resolve, reject) => {
    this.find({ 'players.id': id })
      .then((gameModels: any) => {
        const response: GameModelInterface = gameModels.map(game => {
          return game.toObject();
        });
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default GameScheme;
