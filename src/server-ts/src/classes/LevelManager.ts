import { User } from '../mongo/User/UserModel';
import { GameRecord } from '../mongo/GameRecord/GameRecordModel';
import { PROMOTION_DATA, LevelRulesI } from '../../../types';
import { PROMOTION_EVENT } from '../../../constants';
import { resolve } from 'dns';

interface LevelsMap {
  [level: string]: LevelRulesI;
}
export const levelsMap: LevelsMap = {
  level1: {
    level: 1,
    wpm: 1,
    accuracy: 0.1,
    totalWordsTyped: 1,
    totalCharsTyped: 1,
    text: 'level 1 green fields'
  },
  level2: {
    level: 10,
    wpm: 20,
    accuracy: 0.2,
    totalWordsTyped: 10,
    totalCharsTyped: 20,
    text: 'level 2 yellow fields'
  },
  level3: {
    level: 2,
    wpm: 42,
    accuracy: 0.2,
    totalWordsTyped: 50,
    totalCharsTyped: 100,
    text: 'level 3 blue fields'
  },
  level4: {
    level: 3,
    wpm: 50,
    accuracy: 0.4,
    totalWordsTyped: 100,
    totalCharsTyped: 150,
    text: 'level 4 pink fields'
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
        const newLevel = userModel.level + 1;
        userModel.setLevel(newLevel);
        const data: PROMOTION_DATA = {
          nextObjectives: levelsMap[`level${newLevel}`],
          newLevel
        };
        socket.emit(PROMOTION_EVENT, data);
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
  static getPlayerLevel(playerId: string): Promise<number> {
    return new Promise((resolve, reject) => {
      return User.findById(playerId).then(userModel => {
        resolve(userModel.level);
      });
    });
  }
  static getText(level: number): string {
    return levelsMap[`level${level}`].text;
  }
}

export default LevelManager;
