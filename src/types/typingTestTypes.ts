import { PlayerGameStatus } from './typesIndex';

export interface ScoreSectionsData {
  value: string | number;
  label: string;
}

export interface TypingTestInitGame extends PlayerGameStatus {
  words: string[];
}
export interface StartTypingTestGameI {
  roomId: string;
}
