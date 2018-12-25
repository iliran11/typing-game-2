import { GameRecordsSchema, GameRecordSchema } from './GameRecordScheme';
import { PlayerGameStatus } from '../../../../types';
const mongoose = require('mongoose');

export const GameRecord = mongoose.model('GameRecord', GameRecordSchema);
export const GameRecords = mongoose.model('GameRecords', GameRecordsSchema);
export function createGameRecords(
  models: PlayerGameStatus[],
  instanceId: string
) {
  const gameRecordModels = models.map((model: PlayerGameStatus) => {
    return new GameRecord(model);
  });
  return new GameRecords({
    results: gameRecordModels,
    gameInstanceId: instanceId
  });
}

export function createGameRecord(model: PlayerGameStatus[]) {
  return new GameRecord(model);
}
