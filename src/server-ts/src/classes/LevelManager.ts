import { User } from '../mongo/User/UserModel';
import { GameRecord } from '../mongo/GameRecord/GameRecordModel';
import { LevelRulesI } from '../../../types';
import { PROMOTION_DATA, PROMOTION_EVENT } from '../../../constants';
import { resolve } from 'url';

interface LevelsMap {
  [level: string]: LevelRulesI;
}
export const levelsMap: LevelsMap = {
  level1: {
    level: 1,
    wpm: 1,
    accuracy: 1,
    totalWordsTyped: 1,
    totalCharsTyped: 1
  },
  level2: {
    level: 2,
    wpm: 42,
    accuracy: 0.2,
    totalWordsTyped: 50,
    totalCharsTyped: 100
  },
  level3: {
    level: 3,
    wpm: 50,
    accuracy: 0.4,
    totalWordsTyped: 100,
    totalCharsTyped: 150
  }
};

class LevelManager {
  private static instance: LevelManager;
  private constructor() {}
  // TODO: create a type for this function.
  /**
   * return array of promises: [maxWpm,playerAccuracy,totalWordsTyped,totalCharsTyped]
   */
  static retrievePlayerStats(playerId: string) {
    // TODO: assign here a type instead of facebookuserType
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
  static processNewResult(playerId: string, socket) {
    LevelManager.retrievePlayerStats(playerId).then(userAchievments => {
      const userModel = userAchievments[0];
      const isPromoted = LevelManager.shouldPlayerLevelUp(userAchievments);
      if (isPromoted) {
        userModel.setLevel(userModel.level + 1);
        // const emitData: PROMOTION_DATA;
        // socket.emit(PROMOTION_EVENT);
      }
    });
  }
  static shouldPlayerLevelUp(userAchievments): boolean {
    const currentLevel = userAchievments[0].level;
    const currentRulesSet = levelsMap[`level${currentLevel}`];
    if (currentRulesSet) {
      const didPassWpm = currentRulesSet.wpm < userAchievments[1];
      const didPassTotalWordsTyped =
        currentRulesSet.totalWordsTyped < userAchievments[2];
      const didPassCharsTyped =
        currentRulesSet.totalCharsTyped < userAchievments[3];
      const didPssAccuracy = currentRulesSet.accuracy < userAchievments[4];
      return (
        didPassWpm &&
        didPassTotalWordsTyped &&
        didPassCharsTyped &&
        didPssAccuracy
      );
    } else {
      return false;
    }
  }
  static getInstance() {
    if (!LevelManager.instance) {
      LevelManager.instance = new LevelManager();
    }
    return LevelManager.instance;
  }
}

export default LevelManager;
