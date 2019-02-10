export class GameDomManager {
  input: string[];
  index: number;
  wordRefs: any;
  letterRefs: any;
  constructor() {
    this.input = [];
    this.index = 0;
    this.wordRefs = [];
    this.letterRefs = [];
  }
  init() {
    console.log(document.querySelectorAll('.letter'));
  }
}
