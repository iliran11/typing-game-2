const mongoose = require('mongoose');
import { PlayerGameStatus } from '../../../../types';
import { PlayerScoreScheme } from './PlayerScoreScheme';

export const PlayerResultModel = mongoose.model('RecordsPerPlayer', PlayerScoreScheme);
export function createPlayerScore(model: PlayerGameStatus) {
  return new PlayerResultModel(model);
}
