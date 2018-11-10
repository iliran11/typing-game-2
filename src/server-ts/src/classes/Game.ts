import LetterData from "../../../store/classes/lettterData";

// const words: string = "I went to the park and saw a tree, it was a big tree and it was very green. I could see a red apple on a high branch so I reached up and picked it off. It was weird how I picked it off, as I am very short. I suppose I just jumped really high";
const words: string = "I went to the park and saw a tree";
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
  public getWpmScore(minutesPassed: number) {
    return ((this.index  / minutesPassed)/5);
  }
  public get getPercentageComplete() {
    return this.index / this.letters.length
  }
}
