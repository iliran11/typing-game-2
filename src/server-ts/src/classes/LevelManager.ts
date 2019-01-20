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
    text: 'people who succeed have momentum the more they succeed the more they want to succeed the more they find a way to succeed'
  },
  level2: {
    level: 10,
    wpm: 20,
    accuracy: 0.2,
    totalWordsTyped: 10,
    totalCharsTyped: 20,
    text: 'people who succeed have momentum the more they succeed the more they want to succeed the more they find a way to succeed'
  },
  level3: {
    level: 2,
    wpm: 42,
    accuracy: 0.2,
    totalWordsTyped: 50,
    totalCharsTyped: 100,
    text: 'people who succeed have momentum the more they succeed the more they want to succeed the more they find a way to succeed'
  },
  level4: {
    level: 3,
    wpm: 50,
    accuracy: 0.4,
    totalWordsTyped: 100,
    totalCharsTyped: 150,
    text: 'people who succeed have momentum the more they succeed the more they want to succeed the more they find a way to succeed'
  }
};

class LevelManager {
  private static instance: LevelManager;
  private userCustomLevel: Map<string, number>;
  private constructor() {
    this.userCustomLevel = new Map();
  }
  setUserCustomLevel(playerId: string, customLevel): Promise<string> {
    return new Promise((resolve, reject) => {
      this.getPlayerRealLevel(playerId).then(result => {
        if (result >= customLevel) {
          this.userCustomLevel.set(playerId, customLevel);
          resolve('OK');
        } else {
          reject(`Can't set level Higher than current level`);
        }
      });
    });
  }
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
  getPlayerRealLevel(playerId: string): Promise<number> {
    return new Promise((resolve, reject) => {
      User.findById(playerId).then(userModel => {
        console.log('real level');
        resolve(userModel.level);
      });
    });
  }
  getPlayerLevel(playerId: string): Promise<number> {
    return new Promise((resolve, reject) => {
      if (playerId) {
        this.getPlayerRealLevel(playerId).then(realLevel => {
          const customLevel = this.userCustomLevel.get(playerId);
          // return custom level. if nothing, return the "real level";
          resolve(customLevel || realLevel);
          return;
        });
      } else {
        // if there is no player Id - it means a guest. a guest level is always 1.
        resolve(1);
      }
    });
  }
  static getText(level: number): string {
    return levelsMap[`level${level}`].text;
  }
}

export default LevelManager;
