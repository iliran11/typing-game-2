import { GameRecordsSchema, GameRecordSchema } from './GameRecordScheme';
import { PlayerScore } from '../../../../types';
const mongoose = require('mongoose');

export const GameRecord = mongoose.model('GameRecord', GameRecordSchema);
export const GameRecords = mongoose.model('GameRecords', GameRecordsSchema);
export function createGameRecords(
  models: PlayerScore[],
  instanceId: string
) {
  const gameRecordModels = models.map((model: PlayerScore) => {
    return new GameRecord(model);
  });
  return new GameRecords({ results: gameRecordModels, gameId: instanceId });
}
