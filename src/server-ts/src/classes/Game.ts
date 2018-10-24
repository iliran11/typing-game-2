import LetterData from "../../../store/classes/lettterData";

const words: string = "hellohello worldhellohello worldhellohello worldhellohello worldhellohello worldhellohello world";
const lettersSample = words.split("").map(word => new LetterData(word));

export default class Game {
  private index: number;
  private letters: LetterData[];
  gameId: number;
   static gameCounter: number = 1;

  constructor() {
    this.letters = lettersSample;
    this.index = 0;
    this.gameId = Game.gameCounter;
    Game.gameCounter++;
    this.letters = lettersSample;
  }
  public processNewTyping(input: string) {
    // if we are out of letters, reached the end of the array already - do not process.
    if(this.index===this.letters.length) {
      return;
    }
    const letter = this.letters[this.index];
    letter.setInput(input);
    if (letter.isCorrect) {
      this.index++;
    }
  }
  public get getRawLetters() {
    return words.split("");
  }
  public getWpmScore(timeLeftMinutes: number) {
    return (this.index  / timeLeftMinutes) / 5;
  }
  public get getPercentageComplete() {
    return this.index / this.letters.length
  }
}
