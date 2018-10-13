import LetterData from "../../../store/classes/lettterData";

const words: string = "hello world yello green";
const lettersSample = words.split("").map(word => new LetterData(word));

export default class Game {
  private index: number;
  private letters: LetterData[];
  gameId: number;

  constructor(gameId: number, letters?: LetterData) {
    this.letters = lettersSample;
    this.index = 0;
    this.gameId = gameId;
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
}
