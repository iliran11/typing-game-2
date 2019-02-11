class GameDomManager {
  private input: string[];
  private index: number;
  private letters: string[];
  private wordRefs: any;
  private letterRefs: any;
  private letterRects: any;
  private wordsBoxRect: any;
  private static instance: GameDomManager;
  private markerRef: any;

  private constructor() {
    this.input = [];
    this.letters = [];
    this.index = 0;
    this.wordRefs = [];
    this.letterRefs = [];
    this.letterRects = [];
    this.wordsBoxRect = null;
  }
  private get challenge() {
    return this.letters[this.index];
  }
  private get currentLetterRect() {
    return this.letterRects[this.index];
  }
  init(words: string[]) {
    this.letterRefs = document.querySelectorAll('.letter');
    this.markerRef = document.querySelector('#marker');
    // @ts-ignore
    this.wordsBoxRect = document
      .querySelector('#words-box')
      .getBoundingClientRect();
    this.letters = words.join('').split('');
    this.letterRefs.forEach((letterRef: any) => {
      this.letterRects.push(letterRef.getBoundingClientRect());
    });
    this.markerPosition();
  }
  private letterSuccess(index: number) {
    this.letterRefs[index].classList.add('success');
  }
  private get markerprops() {
    console.log(this.currentLetterRect.left, this.wordsBoxRect.left);
    return {
      top: this.currentLetterRect.top - this.wordsBoxRect.top,
      left: this.currentLetterRect.left - this.wordsBoxRect.left
    };
  }
  markerPosition() {
    const { top, left } = this.markerprops;
    this.markerRef.style.transform = `translate(${left}px,${top}px)`;
    this.markerRef.innerText = this.letters[this.index];
  }
  onInput(value: string) {
    if (this.challenge === value) {
      this.letterSuccess(this.index);
      this.index++;
    } else {
    }
    this.markerPosition();
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
