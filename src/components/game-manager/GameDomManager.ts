class GameDomManager {
  private input: string[];
  private index: number;
  private letters: string[];
  private wordRefs: any;
  private letterRefs: any;
  private static instance: GameDomManager;
  private constructor() {
    this.input = [];
    this.letters = [];
    this.index = 0;
    this.wordRefs = [];
    this.letterRefs = [];
  }
  private get challenge() {
    return this.letters[this.index];
  }
  private get currentLetterRef() {
    return this.letterRefs[this.index];
  }
  init(words: string[]) {
    this.letterRefs = document.querySelectorAll('.letter');
    this.letters = words.join('').split('');
  }
  private letterSuccess(index: number) {
    this.letterRefs[index].classList.add('success');
  }
  onInput(value: string) {
    if (this.challenge === value) {
      this.letterSuccess(this.index);
      this.index++;
    } else {
      console.log(this.currentLetterRef);
    }
  }
  static getInstance() {
    if (!GameDomManager.instance) {
      GameDomManager.instance = new GameDomManager();
      // ... any one time initialization goes here ...
    }
    return GameDomManager.instance;
  }
}

export const gameDomManager = GameDomManager.getInstance();
