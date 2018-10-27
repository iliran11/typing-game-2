import * as React from 'react';
import cx from 'classnames';
import socketManager from '../../socketManager';
import LetterUi from '../letterUi';
import * as scrollIntoView from 'scroll-into-view';

import Marker, { markerProps } from '../Marker';
import './game.css';
interface Props {
  letters: string[];
  dispatch: any;
  isGameActive: boolean;
}

interface State {
  letterGroupIndex: number;
  index: number;
  input: string[];
  allRefsMounted: boolean;
}

export default class GameManager extends React.Component<Props, State> {
  private letterNodes: HTMLElement[];
  private wordBox: any;
  private wordBoxRect: ClientRect | DOMRect;
  private lettersRect: (ClientRect | DOMRect)[];

  constructor(props: Props) {
    super(props);
    this.state = {
      letterGroupIndex: 0,
      index: 0,
      input: [],
      allRefsMounted: false
    };
    this.letterNodes = [];
    this.wordBox = React.createRef();
    this.renderLetters = this.renderLetters.bind(this);
    this.memoizeDomRects = this.memoizeDomRects.bind(this);
    this.onInput = this.onInput.bind(this);
  }
  memoizeDomRects(refArray: HTMLDivElement) {
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

      /* <LetterGroup
          letters={letterGroup}
          onRefReceive={this.memoizeDomRects}
          inputArray={this.state.input[index]}
          currentIndex={
            this.state.letterGroupIndex === index ? this.state.index : null
          }
        /> */
    );
  }
  // get the next index value.
  get incrementIndex(): number  {
    return this.state.index + 1
  }
  updateInputArray(index: number, input: string): string[] {
    const nextInputArray = [...this.state.input];
    nextInputArray[index] = input;
    return nextInputArray;
  }
  onInput(event: any) {
    const { index } = this.state;
    const input: string = event.target.value.toLowerCase();
    const updatedInput = this.updateInputArray(index, input);
    socketManager.emitTyping(input);
    if (input === this.currentLetter) {
      this.setState(
        {
          index: this.incrementIndex,
          input: updatedInput
        },
        () => {
          scrollIntoView(this.nextLetterNode);
        }
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
    return this.letterNodes[this.state.letterGroupIndex][this.state.index];
  }
  get currentLetterRect(): ClientRect | DOMRect {
    return this.lettersRect[this.state.index];
  }
  get nextLetterNode(): HTMLElement {
    return this.letterNodes[this.incrementIndex];
  }
  get wordBoxClassNames() {
    return cx({ disabled: !this.props.isGameActive });
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
      <React.Fragment>
        <input
          onChange={this.onInput}
          value={''}
          autoCorrect="off"
          autoCapitalize="none"
        />
        <div
          id="words-box"
          className={this.wordBoxClassNames}
          ref={this.wordBox}
        >
          {this.props.letters.map(this.renderLetters)}
          <Marker {...this.markerProps} />
        </div>
      </React.Fragment>
    );
  }
}
