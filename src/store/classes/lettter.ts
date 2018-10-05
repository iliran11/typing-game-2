export default class Letter {
  private value: string;
  private input: string;

  constructor(value: string, input?: string) {
    this.value = value;
    this.input = input || "";
  }
  get getValue() {
    return this.value;
  }
  get getInput() {
    return this.input;
  }
}
