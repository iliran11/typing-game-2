import * as React from 'react';
import cx from 'classnames';
import socketManager from '../../socketManager';
import LetterGroup from '../LetterGroup';
import { LETTER_GROUP_SIZE } from '../../constants';
import * as scrollIntoView from 'scroll-into-view';

import Marker, { markerProps } from '../Marker';
import './game.css';
interface Props {
  letters: string[][];
  dispatch: any;
  isGameActive: boolean;
}

interface State {
  letterGroupIndex: number;
  index: number;
  input: string[][];
  allRefsMounted: boolean;
}

export default class GameManager extends React.Component<Props, State> {
  private letterNodes: HTMLElement[][];
  private wordBox: any;
  private wordBoxRect: ClientRect | DOMRect;
  private lettersRect: (ClientRect | DOMRect)[][];

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
    this.renderLetterGroup = this.renderLetterGroup.bind(this);
    this.memoizeDomRects = this.memoizeDomRects.bind(this);
    this.onInput = this.onInput.bind(this);
  }
  memoizeDomRects(refArray: HTMLDivElement[]) {
    this.letterNodes.push(refArray);
    if (this.letterNodes.length === this.props.letters.length) {
      // here we memoize the rects dimensions so we don't have to recalculate them every render.
      this.lettersRect = this.letterNodes.map((refs: HTMLDivElement[]) => {
        return refs.map((ref: HTMLDivElement) => {
          return ref.getBoundingClientRect();
        });
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
      return new Array(LETTER_GROUP_SIZE).fill('');
    });
  }
  renderLetterGroup(letterGroup: string[], index: number) {
    return (
      <div className="letter-group" key={index}>
        <LetterGroup
          letters={letterGroup}
          onRefReceive={this.memoizeDomRects}
          inputArray={this.state.input[index]}
          currentIndex={
            this.state.letterGroupIndex === index ? this.state.index : null
          }
        />
      </div>
    );
  }
  // get the next index value.
  get incrementIndex(): { letterGroupIndex: number; index: number } {
    const { letterGroupIndex, index } = this.state;
    if (index + 1 === LETTER_GROUP_SIZE) {
      return {
        letterGroupIndex: letterGroupIndex + 1,
        index: 0
      };
    } else {
      return {
        index: index + 1,
        letterGroupIndex
      };
    }
  }
  updateInputArray(
    letterGroupIndex: number,
    index: number,
    input: string
  ): string[][] {
    const nextInputArray = [...this.state.input];
    const nextGroupInputArray = [...nextInputArray[letterGroupIndex]];
    nextGroupInputArray[index] = input;
    nextInputArray[letterGroupIndex] = nextGroupInputArray;
    return nextInputArray;
  }
  onInput(event: any) {
    const { letterGroupIndex, index } = this.state;
    const input: string = event.target.value;
    const updatedInput = this.updateInputArray(letterGroupIndex, index, input);
    socketManager.emitTyping(input);
    if (input === this.currentLetter) {
      this.setState(
        {
          ...this.incrementIndex,
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
    const { letterGroupIndex, index } = this.state;
    return this.props.letters[letterGroupIndex][index];
  }
  get currentLetterNode(): Element | null {
    if (this.letterNodes.length === 0) {
      return null;
    }
    return this.letterNodes[this.state.letterGroupIndex][this.state.index];
  }
  get currentLetterRect(): ClientRect | DOMRect {
    return this.lettersRect[this.state.letterGroupIndex][this.state.index];
  }
  get nextLetterNode(): HTMLElement {
    const { letterGroupIndex, index } = this.incrementIndex;
    return this.letterNodes[letterGroupIndex][index];
  }
  get wordBoxClassNames() {
    return cx({ disabled: !this.props.isGameActive });
  }
  get markerProps(): markerProps {
    if (this.letterNodes.length > 0) {
      const { left, top, width, height } = this.currentLetterRect;

      // calculate the position of x,y, with respect to scrolling.
      const y = top - this.wordBoxRect.top
      const x = left - this.wordBoxRect.left
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
        <input onChange={this.onInput} value={''} />
        <div
          id="words-box"
          className={this.wordBoxClassNames}
          ref={this.wordBox}
        >
          {this.props.letters.map(this.renderLetterGroup)}
          <Marker {...this.markerProps} />
        </div>
      </React.Fragment>
    );
  }
}
