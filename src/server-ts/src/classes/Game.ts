import LetterData from '../../../store/classes/lettterData';
const uuid = require('uuid/v4');
import LevelManager from './LevelManager';
export default class Game {
  private index: number;
  private letters: LetterData[];
  numberOfTypings: number;
  gameId: number;
  instanceId: string;
  rawLetters: string;
  static gameCounter: number = 1;

  constructor(level: number) {
    this.rawLetters = LevelManager.getText(level);
    this.letters = LevelManager.getText(level)
      .split('')
      .map(word => new LetterData(word));
    this.index = 0;
    this.gameId = Game.gameCounter;
    this.numberOfTypings = 0;
    Game.gameCounter++;
    this.instanceId = `GAME-${uuid()}`;
  }
  public processNewTyping(input: string) {
    // if we are out of letters, reached the end of the array already - do not process.
    if (this.index === this.letters.length) {
      return;
    }
    this.numberOfTypings++;
    const letter = this.letters[this.index];
    letter.setInput(input);
    if (letter.isCorrect) {
      this.index++;
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
  public getWpmScore(minutesPassed: number) {
    // number of letters in average word;
    const lettersInWord = 5;
    return this.index / lettersInWord / minutesPassed;
  }
  public getCpmScore(minutesPassed: number) {
    return this.index / minutesPassed;
  }
  public get getPercentageComplete() {
    return this.index / this.letters.length;
  }
  public getAccuracy() {
    return this.index / this.numberOfTypings;
  }
  public get currentChallengeLetter() {
    if (this.index < this.letters.length) {
      return this.letters[this.index].getValue;
    }
    return '';
  }
}
