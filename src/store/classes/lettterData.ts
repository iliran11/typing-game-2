export default class Letter {
  private value: string;
  private input: string;

  constructor(value: string, input?: string) {
    this.value = value;
    this.input = input || "";
  }
  get getValue(): string {
    return this.value;
  }
  get getInput() {
    return this.input;
  }
  get isCorrect() {
    
    return this.value.toLowerCase() === this.input.toLowerCase();
  }
  setInput(input: string) {
    this.input = input;
  }
}
