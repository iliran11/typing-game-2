import { PlayerSerialize } from '../types';
import { PlayerGameStatus } from './GameStatusType';
import { RoomType } from './typesIndex';

export interface GameSummryDBI {
  letters: string[];
  players: PlayerGameStatus[];
  roomId: string;
  roomType: RoomType;
  finalResult: {
    results: PlayerGameStatus[];
  };
}
