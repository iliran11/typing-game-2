import { PlayerSerialize } from '../types';
import { PlayerGameStatus } from './GameStatusType';
import { RoomType } from './typesIndex';

export interface GameSummryDBI {
  letters: string[];
  players: PlayerGameStatus[];
  roomId: string;
  roomType: RoomType;
  roomHasFinished: false;
  finalResult: {
    results: PlayerGameStatus[];
  };
}

export interface TypingTestSummary {
  letters: string[];
  player: string;
  roomId: string;
  roomType: RoomType;
  finalResult: PlayerGameStatus;
}
