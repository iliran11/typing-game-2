export interface LevelRuleI {
  level: number;
  wpm: number;
  accuracy: number;
  totalWordsTyped: number;
  totalCharsTyped: number;
}

const rules: LevelRuleI = [
  {
    leve: 1,
    wpm: 42,
    accuracy: 0.2,
    totalWordsTyped: 50,
    totalCharsTyped: 100
  }
  {
    leve: 2,
    wpm: 50,
    accuracy: 0.4,
    totalWordsTyped: 100,
    totalCharsTyped: 150
  }
];

class LevelsManager {
  private static instance: LevelsManager;
  private constructor() {
  }
  private calculatePlayerStats(playerId:string) {

  }
  processNewResult(playerId:string) {
    this.calculatePlayerStats(playerId);
  }
  static getInstance() {
    if (!LevelsManager.instance) {
      LevelsManager.instance = new LevelsManager();
    }
    return LevelsManager.instance;
  }
}
