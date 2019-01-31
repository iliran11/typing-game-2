import { PlayerSerialize, PlayerGameStatus } from '../types';

export interface GameSummryDBI {
  letters: string[];
  players: PlayerSerialize[];
  roomId: string;
  finalResult: {
    results: PlayerGameStatus[];
  };
}
