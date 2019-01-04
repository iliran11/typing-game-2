import { SnapshotGameScheme } from './SnapshotGameScheme';
import { PlayerGameStatus } from '../../../../types';
import { PlayerResultModel } from '../PlayerScore/PlayerStoreModel';
const mongoose = require('mongoose');

export const SnapshotGameModel = mongoose.model(
  'snapshotsOfGame',
  SnapshotGameScheme
);
export function createSnapshotGame(
  models: PlayerGameStatus[],
  instanceId: string,
  gameTickSequenceId: number
) {
  const gameRecordModels = models.map((model: PlayerGameStatus) => {
    return new PlayerResultModel(model);
  });
  return new SnapshotGameModel({
    results: gameRecordModels,
    gameInstanceId: instanceId,
    gameTickSequenceId
  });
}
