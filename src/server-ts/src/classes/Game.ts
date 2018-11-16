import LetterData from "../../../store/classes/lettterData";
import {GAME_WORDS} from '../../../constants'

const lettersSample = GAME_WORDS.split("").map(word => new LetterData(word));

export default class Game {
  private index: number;
  private letters: LetterData[];
  numberOfTypings: number; 
  gameId: number;
   static gameCounter: number = 1;

  constructor() {
    this.letters = lettersSample;
    this.index = 0;
    this.gameId = Game.gameCounter;
    this.numberOfTypings = 0;
    Game.gameCounter++;
    this.letters = lettersSample;
  }
  public processNewTyping(input: string) {
    // if we are out of letters, reached the end of the array already - do not process.
    if(this.index===this.letters.length) {
      return;
    }
    this.numberOfTypings ++;
    const letter = this.letters[this.index];
    letter.setInput(input);
    if (letter.isCorrect) {
      this.index++;
    }
  }
  public get getRawLetters() {
    return GAME_WORDS.split("");
  }
  public getWpmScore(minutesPassed: number) {
    return ((this.index  / minutesPassed)/5);
  }
  public get getPercentageComplete() {
    return this.index / this.letters.length
  }
}
