import * as React from 'react';
import socketManager from '../../socketManager';
import LetterGroup from '../LetterGroup';
import { LETTER_GROUP_SIZE } from '../../constants';
import * as scrollIntoView from 'scroll-into-view';

import Marker, { markerProps } from '../Marker';
import './game.css';
interface Props {
  letters: string[][];
  dispatch: any;
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
    socketManager.initSocket(props.dispatch);

    this.renderLetterGroup = this.renderLetterGroup.bind(this);
    this.buildLetterNodes = this.buildLetterNodes.bind(this);
    this.onInput = this.onInput.bind(this);
  }
  buildLetterNodes(ref: HTMLDivElement[]) {
    this.letterNodes.push(ref);
    if (this.letterNodes.length === this.props.letters.length) {
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
      <div className="letter-group">
        <LetterGroup
          letters={letterGroup}
          onRefReceive={this.buildLetterNodes}
          inputArray={this.state.input[index]}
          currentIndex = {this.state.letterGroupIndex===index ? this.state.index : null}
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
  get nextLetterNode(): HTMLElement {
    const { letterGroupIndex, index } = this.incrementIndex;
    return this.letterNodes[letterGroupIndex][index];
  }

  get markerProps(): markerProps {
    const letterNode = this.currentLetterNode;
    if (letterNode) {
      const { left, top } = letterNode.getBoundingClientRect();
      const wordBoxRect = this.wordBox.current.getBoundingClientRect();
      // calculate the position of x,y, with respect to scrolling.
      const y = top - wordBoxRect.top + this.wordBox.current.scrollTop;
      const x = left - wordBoxRect.left - this.wordBox.current.scrollLeft;
      const width = letterNode.clientWidth;
      const height = letterNode.clientHeight;
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
        <div id="words-box" ref={this.wordBox}>
          {this.props.letters.map(this.renderLetterGroup)}
          <Marker {...this.markerProps} />
        </div>
      </React.Fragment>
    );
  }
}
