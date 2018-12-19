import GameScheme from './GameScheme';
import { GameModelInterface } from '../../../../types';
const mongoose = require('mongoose');

export const Game = mongoose.model('game', GameScheme);
export function createGameDocument(model: GameModelInterface) {
  return new Game(model);
}
