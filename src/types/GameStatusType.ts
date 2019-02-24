import { PlayerType, PlayerAvatar, RoomType } from '../types';

export interface PlayerGameStatus {
  playerId: string;
  wpm: number;
  cpm: number;
  completedPercentage: number;
  type: PlayerType;
  hasLeft: boolean;
  hasFinished: boolean;
  gameDuration: number;
  accuracy: number;
  avatar: PlayerAvatar;
  numberOfTypings: number;
  numberOfLetters: number;
  numberOfWords: number;
  rank: number;
  roomId: string;
  isAuthenticated: boolean;
  roomType: RoomType;
  name: string;
}
