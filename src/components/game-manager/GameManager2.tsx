import * as React from 'react';
import cx from 'classnames';
import socketManager from '../../socketManager';
import LetterUi from '../letterUi';
import Marker, { markerProps } from '../Marker';
import './game.css';
// no updated definitions for this library. that's a way to workaround it.
const scrollIntoView = require('scroll-into-view');

interface Props {
  letters: string[];
  dispatch: any;
  gameActive: boolean;
}

interface State {
  index: number;
  input: string[];
  allRefsMounted: boolean;
}

export default class GameManager extends React.Component<Props, State> {
  private letterNodes: HTMLElement[];
  private wordBox: any;
  private wordBoxRect: ClientRect | DOMRect;
  private lettersRect: (ClientRect | DOMRect)[];
  private bodyElement: any;
  private inputRef: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      index: 0,
      input: [],
      allRefsMounted: false
    };

    this.letterNodes = [];
    this.wordBox = React.createRef();
    this.inputRef = React.createRef();
    this.bodyElement = document.querySelector('body');
    this.onBodyClick = this.onBodyClick.bind(this);
    /**
     * if user click on anywhere on body while playing
     * re-focus him on the input.
     */
    if (this.bodyElement) {
      this.bodyElement.addEventListener('click', this.onBodyClick);
    }
    this.renderLetters = this.renderLetters.bind(this);
    this.memoizeDomRects = this.memoizeDomRects.bind(this);
    this.onInput = this.onInput.bind(this);
    this.scrollIntoView = this.scrollIntoView.bind(this);
  }
  componentWillUnmount() {
    this.bodyElement.removeEventListener(this.onBodyClick);
  }
  onBodyClick() {
    if (this.inputRef.current) {
      this.inputRef.current.focus();
    }
  }
  memoizeDomRects(refArray: HTMLDivElement) {
    // build the letter nodes.
    this.letterNodes.push(refArray);
    if (this.letterNodes.length === this.props.letters.length) {
      // here we memoize the rects dimensions so we don't have to recalculate them every render.
      this.lettersRect = this.letterNodes.map((ref: HTMLDivElement) => {
        return ref.getBoundingClientRect();
      });
      this.wordBoxRect = this.wordBox.current.getBoundingClientRect();
      this.setState({
        allRefsMounted: true,
        input: this.buildEmptyInputArray
      });
    }
  }
  get buildEmptyInputArray() {
    return new Array(this.props.letters.length).fill(undefined).map(() => {
      return '';
    });
  }
  renderLetters(letter: string, index: number) {
    return (
      <LetterUi
        letter={letter}
        isSelected={this.state.index === index}
        input={this.state.input[index]}
        onRefReceive={this.memoizeDomRects}
      />
    );
  }
  // get the next index value.
  get incrementIndex(): number {
    return this.state.index + 1;
  }
  get isGameEnd() {
    return this.state.index > this.props.letters.length;
  }
  updateInputArray(index: number, input: string): string[] {
    const nextInputArray = [...this.state.input];
    nextInputArray[index] = input;
    return nextInputArray;
  }
  scrollIntoView() {
    // do not scroll if no changes in the y coordinate of the letters.
    if (this.currentLetterRect.top === this.previousLetterRect.top) {
      return;
    }
    scrollIntoView(this.currentLetterNode, {
      time: 200,
      align: {
        top: 1
      },
      isScrollable: () => true
    });
    window.scrollTo(0, 0);
  }
  onInput(event: any) {
    if (!this.props.gameActive) {
      return;
    }
    const { index } = this.state;
    const input: string = event.target.value.toLowerCase();
    const updatedInput = this.updateInputArray(index, input);
    socketManager.emitTyping(input);
    const gameInProgress = this.incrementIndex < this.props.letters.length;
    if (!gameInProgress) {
      alert('game end!');
    }
    if (input === this.currentLetter && gameInProgress) {
      this.setState(
        {
          index: this.incrementIndex,
          input: updatedInput
        },
        this.scrollIntoView
      );
    } else {
      this.setState({
        input: updatedInput
      });
    }
  }
  get currentLetter(): string {
    const { index } = this.state;
    return this.props.letters[index];
  }
  get currentLetterNode(): Element | null {
    if (this.letterNodes.length === 0) {
      return null;
    }
    return this.letterNodes[this.state.index];
  }
  get currentLetterRect(): ClientRect | DOMRect {
    return this.lettersRect[this.state.index];
  }
  get previousLetterRect(): ClientRect | DOMRect {
    return this.lettersRect[this.state.index - 1];
  }
  get previousLetterNode(): HTMLElement {
    return this.letterNodes[this.state.index - 1];
  }
  get wordBoxClassNames() {
    return cx({ disabled: !this.props.gameActive });
  }
  get markerProps(): markerProps {
    if (this.letterNodes.length > 0) {
      const { left, top, width, height } = this.currentLetterRect;

      // calculate the position of x,y, with respect to scrolling.
      const y = top - this.wordBoxRect.top;
      const x = left - this.wordBoxRect.left;
      return {
        x,
        y,
        width,
        input: this.currentLetter,
        height
      };
    }
    return {
      x: 0,
      y: 0,
      width: 0,
      input: '',
      height: 0
    };
  }
  render() {
    return (
      <div className="shadow-2dp">
        <input
          onChange={this.onInput}
          value={''}
          autoCorrect="off"
          autoCapitalize="none"
          autoFocus={true}
          id="game-input"
          ref={this.inputRef}
        />
        <div
          id="words-box"
          className={this.wordBoxClassNames}
          ref={this.wordBox}
        >
          {this.props.letters.map(this.renderLetters)}
          {this.props.gameActive && <Marker {...this.markerProps} />}
        </div>
      </div>
    );
  }
}
