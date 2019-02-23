import { PlayerSerialize } from '../types';
import { PlayerGameStatus } from './GameStatusType';
import { RoomType, TypingGameInfoI } from './typesIndex';
import BotPlayer from 'src/classes/BotPlayer';
import Player from 'src/classes/Player';

export interface GameSummryDBI {
  letters: string[];
  players: (Player | BotPlayer)[];
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
