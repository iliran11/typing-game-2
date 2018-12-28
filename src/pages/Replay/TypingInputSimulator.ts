import { TypingModelI } from '../../types';

class inputSimulator {
  inputIndex: number;
  typingHistoryIndex: number;
  input: string[];
  typingHistory: string[];
  lastTypingFailed: boolean;

  constructor(typingHistory: string[]) {
    this.inputIndex = 0;
    this.typingHistoryIndex = 0;
    this.input = [];
    this.typingHistory = typingHistory;
    this.lastTypingFailed = false;
  }
  calculateNextState(typingModel: TypingModelI) {
    if (this.isTypingCorrect(typingModel.typedLetter)) {
      this.typingHistoryIndex++;
      if (this.lastTypingFailed === false) {
        this.input = [...this.input, ...typingModel.typedLetter];
        this.lastTypingFailed = false;
        this.inputIndex++;
      } else {
        this.input[this.inputIndex] = typingModel.typedLetter;
        this.input = [...this.input];
        this.inputIndex++;
      }
    } else {
      this.input[this.inputIndex] = typingModel.typedLetter;
      this.input = [...this.input];
      this.lastTypingFailed = true;
    }
  }
  nexTypingState(
    typingModel: TypingModelI
  ): {
    input: string[];
    inputIndex: number;
  } {
    this.calculateNextState(typingModel);
    {
      return {
        input: this.input,
        inputIndex: this.inputIndex
      };
    }
  }
  private isTypingCorrect(typedLetter: string) {
    return (
      typedLetter.toLocaleLowerCase() ===
      this.currentChallange.toLocaleLowerCase()
    );
  }
  get currentChallange() {
    return this.typingHistory[this.typingHistoryIndex].toLocaleLowerCase();
  }
}

export default inputSimulator;
