import { User } from '../mongo/User/UserModel';
import { GameRecord } from '../mongo/GameRecord/GameRecordModel';
import { PROMOTION_DATA, LevelRulesI, PlayerGameStatus } from '../../../types';
import { UserAchievementsI } from '../../../types/AchievementsTypes';
import { PROMOTION_EVENT } from '../../../constants';

interface LevelsMap {
  [level: string]: LevelRulesI;
}

interface UserAchievmentsWithModel extends UserAchievementsI {
  playerModel: any;
}

export const levelsMap: LevelsMap = {
  level1: {
    level: 1,
    wpm: 1,
    accuracy: 0.1,
    totalWordsTyped: 1,
    totalCharsTyped: 1,
    text: 'level 1'
  },
  level2: {
    level: 10,
    wpm: 20,
    accuracy: 0.2,
    totalWordsTyped: 10,
    totalCharsTyped: 20,
    text: 'level 1'
  },
  level3: {
    level: 2,
    wpm: 42,
    accuracy: 0.2,
    totalWordsTyped: 50,
    totalCharsTyped: 100,
    text: 'level 2'
  },
  level4: {
    level: 3,
    wpm: 50,
    accuracy: 0.4,
    totalWordsTyped: 100,
    totalCharsTyped: 150,
    text: 'level 2'
  }
};

class LevelManager {
  static instance: LevelManager;
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
  static retrievePlayerStats(playerId: string): any {
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
  private static async getPlayerStatsWithModel(
    playerId: string
  ): Promise<UserAchievmentsWithModel> {
    const result = await LevelManager.retrievePlayerStats(playerId);
    const playerModel = result[0];
    return {
      playerModel: result[0],
      wpm: result[1],
      totalWordsTyped: result[2],
      totalCharsTyped: result[3],
      accuracy: result[4],
      currentLevelRules: levelsMap[`level${playerModel.level}`],
      level: playerModel.level,
      ranking: -11111
    };
  }
  public static async getPlayerStats(
    playerId: string
  ): Promise<UserAchievementsI> {
    const result = await LevelManager.getPlayerStatsWithModel(playerId);
    delete result.playerModel;
    return result;
  }
  static calculateNextStats(
    currentStats: UserAchievementsI,
    playerGameStatus: PlayerGameStatus
  ): UserAchievementsI {
    const wpm = Math.max(currentStats.wpm, playerGameStatus.score);
    const totalWordsTyped =
      currentStats.totalWordsTyped + (playerGameStatus.numberOfWords || 0);
    const totalCharsTyped =
      currentStats.totalCharsTyped + (playerGameStatus.numberOfLetters || 0);

    const accuracy = Math.max(
      currentStats.accuracy,
      playerGameStatus.accuracy || 0
    );
    const nextUserAchievements: UserAchievementsI = {
      wpm,
      accuracy,
      totalWordsTyped,
      totalCharsTyped,
      level: currentStats.level,
      currentLevelRules: currentStats.currentLevelRules,
      ranking: -11111
    };
    const hasPromoted = LevelManager.shouldPlayerLevelUp(nextUserAchievements);
    if (hasPromoted) {
      nextUserAchievements.level = nextUserAchievements.level + 1;
    }
    return nextUserAchievements;
  }
  static async processNewResult(playerId: string, socket) {
    const userAchievements = await LevelManager.getPlayerStatsWithModel(
      playerId
    );
    const isPromoted = LevelManager.shouldPlayerLevelUp(userAchievements);
    if (isPromoted) {
      const newLevel = userAchievements.playerModel.level + 1;
      userAchievements.playerModel.setLevel(newLevel);
      const data: PROMOTION_DATA = {
        nextObjectives: levelsMap[`level${newLevel}`],
        newLevel
      };
      socket.emit(PROMOTION_EVENT, data);
    }
  }

  static shouldPlayerLevelUp(userAchievments: UserAchievementsI): boolean {
    const currentLevel = userAchievments.level;
    const currentRulesSet = levelsMap[`level${currentLevel}`];
    if (currentRulesSet) {
      const didPassWpm = currentRulesSet.wpm <= userAchievments.wpm;
      const didPassTotalWordsTyped =
        currentRulesSet.totalWordsTyped <= userAchievments.totalWordsTyped;
      const didPassCharsTyped =
        currentRulesSet.totalCharsTyped <= userAchievments.totalCharsTyped;
      const didPssAccuracy =
        currentRulesSet.accuracy <= userAchievments.accuracy;
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
