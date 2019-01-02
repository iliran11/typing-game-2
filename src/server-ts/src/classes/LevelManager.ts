import { User } from '../mongo/User/UserModel';
import { GameRecord } from '../mongo/GameRecord/GameRecordModel';
import { FacebookUserType } from '../../../types';

export interface LevelRuleI {
  level: number;
  wpm: number;
  accuracy: number;
  totalWordsTyped: number;
  totalCharsTyped: number;
}

const rules: LevelRuleI[] = [
  {
    level: 1,
    wpm: 42,
    accuracy: 0.2,
    totalWordsTyped: 50,
    totalCharsTyped: 100
  },
  {
    level: 2,
    wpm: 50,
    accuracy: 0.4,
    totalWordsTyped: 100,
    totalCharsTyped: 150
  }
];

class LevelManager {
  private static instance: LevelManager;
  private constructor() {}
  retrievePlayerStats(playerId: string) {
    const playerModel: Promise<FacebookUserType> = User.findById(playerId);
    const playerMaxWpm: Promise<number> = GameRecord.maxWpmOfPlayer(
      playerId,
      'numberOfWords'
    );
    const totalWordsTyped: Promise<number> = GameRecord.totalWords(
      playerId,
      'numberOfWords'
    );
    return Promise.all([playerModel, playerMaxWpm, totalWordsTyped]);
  }

  processNewResult(playerId: string) {
    this.retrievePlayerStats(playerId);
  }
  static getInstance() {
    if (!LevelManager.instance) {
      LevelManager.instance = new LevelManager();
    }
    return LevelManager.instance;
  }
}

export default LevelManager;
