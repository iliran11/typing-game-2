import { PlayerSerialize } from './typesIndex';

export interface TypingGameInfoI {
  instanceId: string;
  words: string[];
  isGameActive: boolean;
  wpm: number;
  cpm: number;
  accuracy: number;
  player: PlayerSerialize;
}

export interface ScoreboardSectionData {
  value: string | number;
  label: string;
}