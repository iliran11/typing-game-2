import LetterData from '../../../store/classes/lettterData';
const uuid = require('uuid/v4');
import { BasePlayer } from './Player/BasePlayer';

export default class Game {
  private index: number;
  private letters: LetterData[];
  numberOfTypings: number;
  gameId: number;
  instanceId: string;
  private rawLetters: string;
  private gameHasEnded: boolean;
  static gameCounter: number = 1;
  private startTimestamp: number = -1;
  private endTimestamp: number = -1;
  private player: BasePlayer;
  private forcedAccuracy: number | undefined;

  constructor(level: number, player: BasePlayer, forcedAccuracy?: number) {
    this.rawLetters =
      'I went to the park and saw a tree, it was a big tree and it was very green. I could see a red apple on a high branch so I reached up and picked it off. It was weird how I picked it off, as I am very short.';
    this.letters = this.rawLetters.split('').map(word => new LetterData(word));
    this.index = 0;
    this.gameId = Game.gameCounter;
    this.numberOfTypings = 0;
    Game.gameCounter++;
    this.instanceId = `GAME-${uuid()}`;
    this.gameHasEnded = false;
    this.player = player;
    this.forcedAccuracy = forcedAccuracy;
  }
  private get isGameEnd() {
    return this.index === this.letters.length;
  }
  setStartTimestamp(timestamp: number) {
    this.startTimestamp = timestamp;
  }
  endGame() {
    this.gameHasEnded = true;
    this.endTimestamp = Date.now();
    this.player.onGameEnd();
  }
  public processNewTyping(input: string) {
    if (this.isGameEnd) return;
    const letter = this.letters[this.index];
    letter.setInput(input);
    this.numberOfTypings++;
    if (letter.isCorrect) {
      this.index++;
    }
    // if we are out of letters, reached the end of the array already - do not process.
    if (this.isGameEnd && this.gameHasEnded === false) {
      this.endGame();
    }
  }
  public get getRawLetters() {
    return this.rawLetters.split('');
  }
  public get words() {
    return this.rawLetters.split(/(\s+)/);
  }
  public get numberOfWords() {
    let numberOfWords = 0;
    this.getRawLetters
      .join('')
      .split(' ')
      .forEach((groupOfLetters: string) => {
        if (groupOfLetters.length > 1) {
          numberOfWords++;
        }
      });
    return numberOfWords;
  }
  private get minutesPassed() {
    return (Date.now() - this.startTimestamp) / 60000;
  }
  public getWpmScore() {
    // number of letters in average word;
    const lettersInWord = 5;
    return this.index / lettersInWord / this.minutesPassed;
  }
  public getCpmScore() {
    return this.index / this.minutesPassed;
  }
  public get getPercentageComplete() {
    return this.index / this.letters.length;
  }
  public getAccuracy() {
    if (this.forcedAccuracy) {
      return this.forcedAccuracy;
    }
    if (this.numberOfTypings === 0) return 0;
    return this.index / this.numberOfTypings;
  }
  public get currentChallengeLetter() {
    if (this.index < this.letters.length) {
      return this.letters[this.index].getValue;
    }
    return '';
  }
  public get gameDuration() {
    if (this.gameHasEnded) {
      return this.endTimestamp - this.startTimestamp;
    } else {
      return Date.now() - this.startTimestamp;
    }
  }
}
