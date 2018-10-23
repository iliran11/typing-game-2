import LetterData from "../../../store/classes/lettterData";

const words: string = "hellohello world yello green hello world yello green hello world yello hellohello world yello green hello world yello green hello world yellohellohello world yello green hello world yello green hello world yellohellohello world yello green hello world yello green hello world yellohellohello world yello green hello world yello green hello world yello";
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
    return (this.index + 1 / timeLeftMinutes) / 5;
  }
  public get getPercentageComplete() {
    return this.index / this.letters.length
  }
}
