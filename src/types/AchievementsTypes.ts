import { HighlightsI, ProfileBestGame } from '../types/typesIndex';

export interface UserAchievmentsReducerI {
  readonly [userId: string]: GameTypesAchivements;
}
export interface BestGameReducerI {
  readonly [userId: string]: ProfileBestGame;
}

export interface PlatformsAchievementsI {
  mobile: UserAchievementsI;
  desktop: UserAchievementsI;
}
export interface GameTypesAchivements {
  typingTest: PlatformsAchievementsI;
  multiplayer: PlatformsAchievementsI;
  playerId: string;
}
export interface UserAchievementsI {
  totalGames: number;
  totalWins: number;
  playerId: string;
}
export interface AchievementsProgressI {
  prevAchievement: UserAchievementsI;
  nextachievement: UserAchievementsI;
  roomId: string;
  timestamp: any;
}

export interface AchievementsProgressReducer {
  [roomId: string]: AchievementsProgressI;
}

// export interface AchievementsI {
//   wpm: number;
//   accuracy: number;
//   totalWordsTyped: number;
//   totalCharsTyped: number;
// }

// properties in UserAchievementsI that can be displayed as a range/progress
export const rangeAbleProperties = {
  wpm: true,
  totalWordsTyped: true,
  totalCharsTyped: true,
  accuracy: true
};
