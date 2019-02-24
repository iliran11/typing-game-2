import { PlayerGameStatus } from './typesIndex';

export interface ScoreboardSectionData {
  value: string | number;
  label: string;
}

export interface TypingTestInitGame extends PlayerGameStatus {
  words: string[];
}
