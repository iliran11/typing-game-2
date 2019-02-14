const scrollIntoView = require('scroll-into-view');

class GameDomManager {
  private input: string[];
  private index: number;
  private letters: string[];
  private wordRefs: any;
  private letterRefs: any;
  private letterRects: any;
  private wordsBoxRef: any;
  private wordsBoxRect: any;
  private static instance: GameDomManager;
  private markerRef: any;
  private toolTipRef: any;
  private tooltipPlaceholderRef: any;

  private constructor() {
    this.input = [];
    this.letters = [];
    this.index = 0;
    this.wordRefs = [];
    this.letterRefs = [];
    this.letterRects = [];
    this.wordsBoxRef = null;
    this.wordsBoxRect = null;
    this.toolTipRef = null;
    this.tooltipPlaceholderRef = null;
  }
  private get challenge() {
    return this.letters[this.index];
  }
  private get currentLetterRect() {
    return this.letterRects[this.index];
  }
  private get previousLetterRect() {
    return this.letterRects[this.index - 1];
  }
  init(words: string[]) {
    this.letterRefs = document.querySelectorAll('.letter');
    this.markerRef = document.querySelector('#marker');
    this.toolTipRef = document.querySelector('#tooltip');
    this.tooltipPlaceholderRef = document.querySelector('#tooltip-spaceholder');
    // @ts-ignore
    this.wordsBoxRef = document.querySelector('#words-box');
    this.wordsBoxRect = this.wordsBoxRef.getBoundingClientRect();
    this.letters = words.join('').split('');
    this.letterRefs.forEach((letterRef: any) => {
      this.letterRects.push(letterRef.getBoundingClientRect());
    });
    this.markerPosition();
    this.tooltipPosition();
  }
  private letterSuccess(index: number) {
    this.letterRefs[index].classList.add('success');
  }
  private get markerprops() {
    return {
      top: this.currentLetterRect.top - this.wordsBoxRect.top,
      left: this.currentLetterRect.left - this.wordsBoxRect.left
    };
  }
  private tooltipPosition() {
    const tooltipRect = this.toolTipRef.getBoundingClientRect();
    const left =
      this.wordsBoxRect.left -
      tooltipRect.width / 2 +
      this.currentLetterRect.left -
      this.wordsBoxRect.left +
      this.letterRects[this.index].width / 2;
    const scroll = this.wordsBoxRef.scrollTop;
    this.toolTipRef.style.left = `${left}px`;
    this.toolTipRef.style.top = `${this.currentLetterRect.top - scroll - 40}px`;
  }
  private markerPosition() {
    const { top, left } = this.markerprops;
    this.markerRef.style.transform = `translate(${left}px,${top}px)`;
    this.markerRef.innerText = this.letters[this.index];
    this.markerRef.style.width = `${this.currentLetterRect.width}px`;
    this.markerRef.style.height = `${this.currentLetterRect.height}px`;
  }
  onInput(value: string) {
    const originalIndex = this.index;
    if (this.challenge === value) {
      this.letterSuccess(this.index);
      if (this.index < this.letters.length - 1) {
        this.index++;
      } else {
        console.log('finish');
      }
    } else {
      this.tooltipPosition();
      this.tooltipPlaceholderRef.innerText = value === ' ' ? '_' : value;
      this.toolTipRef.style.opacity = '1';
      setTimeout(() => {
        this.toolTipRef.style.opacity = '0';
      }, 1000);
    }
    this.markerPosition();
    if (
      this.index > 0 &&
      this.currentLetterRect.top !== this.previousLetterRect.top
    ) {
      console.log('scroll!');
      scrollIntoView(this.letterRefs[this.index], {
        time: 200,
        align: {
          top: 0.8
        },
        isScrollable: () => true
      });
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
