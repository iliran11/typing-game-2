import { GameRecordsSchema, GameRecordSchema } from './GameRecordScheme';
import { PlayerGameStatus } from '../../../../types';
const mongoose = require('mongoose');

export const GameRecord = mongoose.model('RecordsPerPlayer', GameRecordSchema);
export const GameRecords = mongoose.model('GameRecords', GameRecordsSchema);
export function createGameRecords(
  models: PlayerGameStatus[],
  instanceId: string,
  gameTickSequenceId: number
) {
  const gameRecordModels = models.map((model: PlayerGameStatus) => {
    return new GameRecord(model);
  });
  return new GameRecords({
    results: gameRecordModels,
    gameInstanceId: instanceId,
    gameTickSequenceId
  });
}

export function createGameRecord(model: PlayerGameStatus) {
  return new GameRecord(model);
}
