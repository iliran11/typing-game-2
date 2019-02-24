import { PlayerSerialize } from '../types';
import { PlayerGameStatus } from './GameStatusType';
import { RoomType, TypingGameInfoI } from './typesIndex';

export interface GameSummryDBI {
  letters: string[];
  players: PlayerGameStatus[];
  roomId: string;
  roomType: RoomType;
  finalResult: {
    results: PlayerGameStatus[];
  };
}

export interface TypingTestSummary {
  letters: string[];
  player: string;
  roomId: string;
  roomType: RoomType;
  finalResult: TypingGameInfoI;
}
