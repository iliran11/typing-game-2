import { GameRecordsSchema } from '../GameRecord/GameRecordScheme';
import { GameModelInterface } from '../../../../types';
import { resolve } from 'url';
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
GameScheme.statics.getGameInfoByGameId = function(
  roomId: string
): Promise<GameModelInterface> {
  return new Promise((resolve, reject) => {
    this.find({ _id: roomId })
      .then((gameModel: any) => {
        resolve(gameModel);
      })
      .catch(err => reject(err));
  });
};

export default GameScheme;
