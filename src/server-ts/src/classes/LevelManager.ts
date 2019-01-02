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
    const playerModel: Promise<any> = User.findById(playerId);
    const playerMaxWpm: Promise<number> = GameRecord.maxWpmOfField(
      playerId,
      'score'
    );
    const playerAccuracy: Promise<number> = GameRecord.maxWpmOfField(
      playerId,
      'accuracy'
    );
    const totalWordsTyped: Promise<number> = GameRecord.totalWords(
      playerId,
      'numberOfWords'
    );
    const totalCharsTyped: Promise<number> = GameRecord.totalWords(
      playerId,
      'numberOfLetters'
    );
    return Promise.all([
      playerModel,
      playerMaxWpm,
      totalWordsTyped,
      totalCharsTyped,
      playerAccuracy
    ]);
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
