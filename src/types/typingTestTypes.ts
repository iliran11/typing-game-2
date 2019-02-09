export interface TypingGameInfoI {
  instanceId: string;
  letters: string[];
  isGameActive: boolean;
  wpm: number;
  cpm: number;
  accuracy: number;
}

export interface ScoreboardSectionData {
  value: string | number;
  label: string;
}
