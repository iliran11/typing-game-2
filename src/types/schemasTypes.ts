import { PlayerSerialize } from '../types';
import { PlayerGameStatus } from './GameStatusType';

export interface GameSummryDBI {
  letters: string[];
  players: PlayerGameStatus[];
  roomId: string;
  finalResult: {
    results: PlayerGameStatus[];
  };
}
