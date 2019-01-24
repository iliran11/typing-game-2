import { LevelRulesI } from '../types';

export interface UserAchievmentsReducerI {
  readonly [userId: string]: UserAchievementsI;
}
export interface AchievementsProgressReducer {
  [roomId: string]: AchievementsProgressI;
}
export interface AchievementsProgressI {
  prevAchievement: UserAchievementsI;
  nextachievement: UserAchievementsI;
  roomId: string;
  timestamp: any;
}

export interface UserAchievementsI {
  level: number;
  maxWpm: number;
  totalWords: number;
  totalChars: number;
  maxAccuracy: number;
  currentLevelRules: LevelRulesI;
  ranking: number;
}
