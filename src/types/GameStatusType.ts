import { PlayerType, PlayerAvatar } from '../types';

export interface PlayerGameStatus {
  playerId: string;
  score: number;
  completedPercentage: number;
  type: PlayerType;
  hasLeft: boolean;
  isFinished: boolean;
  finishedTimeStamp?: number;
  gameDuration?: number;
  accuracy?: number;
  avatar: PlayerAvatar;
  name: string;
  numberOfTypings?: number;
  numberOfLetters?: number;
  numberOfWords?: number;
  rankAtFinish?: number;
  roomId: string;
  isAuthenticated: boolean;
}
// TODO: create a new type of object - finalizedGameStatus - where no optionals fields.
export class PlayerGameStatusFactory implements PlayerGameStatus {
  playerId: string;
  score: number;
  completedPercentage: number;
  type: PlayerType;
  hasLeft: boolean;
  isFinished: boolean;
  finishedTimeStamp?: number;
  gameDuration?: number;
  accuracy?: number;
  avatar: PlayerAvatar;
  name: string;
  numberOfTypings?: number;
  numberOfLetters?: number;
  numberOfWords?: number;
  rankAtFinish: number;
  roomId: string;
  isAuthenticated: boolean;

  constructor(options: any) {
    const {
      playerId,
      score,
      completedPercentage,
      type,
      hasLeft,
      isFinished,
      finishedTimeStamp,
      gameDuration,
      accuracy,
      avatar,
      name,
      numberOfTypings,
      numberOfLetters,
      numberOfWords,
      rankAtFinish,
      roomId,
      isAuthenticated
    } = options;
    this.playerId = playerId;
    this.score = score;
    this.completedPercentage = completedPercentage;
    this.type = type;
    this.hasLeft = hasLeft;
    this.isFinished = isFinished;
    this.finishedTimeStamp = finishedTimeStamp;
    this.gameDuration = gameDuration;
    this.accuracy = accuracy;
    this.avatar = avatar;
    this.name = name;
    this.numberOfTypings = numberOfTypings;
    this.numberOfWords = numberOfWords;
    this.numberOfLetters = numberOfLetters;
    this.rankAtFinish = rankAtFinish;
    this.roomId = roomId;
    this.isAuthenticated = isAuthenticated;
  }
  get serialize(): PlayerGameStatus {
    return {
      playerId: this.playerId,
      score: this.score,
      completedPercentage: this.completedPercentage,
      type: this.type,
      hasLeft: this.hasLeft,
      isFinished: this.isFinished,
      finishedTimeStamp: this.finishedTimeStamp,
      gameDuration: this.gameDuration,
      accuracy: this.accuracy,
      avatar: this.avatar,
      name: this.name,
      numberOfTypings: this.numberOfTypings,
      numberOfWords: this.numberOfWords,
      numberOfLetters: this.numberOfLetters,
      rankAtFinish: this.rankAtFinish,
      roomId: this.roomId,
      isAuthenticated: this.isAuthenticated
    };
  }
}
