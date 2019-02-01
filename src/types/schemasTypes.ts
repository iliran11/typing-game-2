import { PlayerSerialize } from '../types';
import { PlayerGameStatus } from './GameStatusType';

export interface GameSummryDBI {
  letters: string[];
  players: PlayerSerialize[];
  roomId: string;
  finalResult: {
    results: PlayerGameStatus[];
  };
}
