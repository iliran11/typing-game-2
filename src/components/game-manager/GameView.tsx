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
  currentLetter: string;
  gameActive: boolean;
  changeToolTipPosition: (x: number, y: number, input: string) => void;
  closeTooltip: () => void;
  gameIsFinished: () => void;
}

interface State {
  index: number;
  input: string[];
  allRefsMounted: boolean;
}

export default class GameManager extends React.Component<any, State> {
  private letterNodes: HTMLElement[];
  private wordBox: any;
  // @ts-ignore
  private wordBoxRect: ClientRect | DOMRect;
  private lettersRect: (ClientRect | DOMRect)[] = [];

  constructor(props: Props) {
    super(props);
    this.state = {
      index: 0,
      input: [],
      allRefsMounted: false
    };

    this.letterNodes = [];
    this.wordBox = React.createRef();
    this.showLetterTooltip = this.showLetterTooltip.bind(this);
    /**
     * if user click on anywhere on body while playing
     * re-focus him on the input.
     */
    this.renderLetters = this.renderLetters.bind(this);
    this.memoizeDomRects = this.memoizeDomRects.bind(this);
    this.scrollIntoView = this.scrollIntoView.bind(this);
    this.checkIfFinished = this.checkIfFinished.bind(this);
  }
  memoizeDomRects(refArray: HTMLDivElement) {
    // build the letter nodes.
    this.letterNodes.push(refArray);
    if (this.letterNodes.length === this.props.letters.length) {
      // here we memoize the rects dimensions so we don't have to recalculate them every render.
      this.lettersRect = this.letterNodes.map((ref: HTMLElement) => {
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
  showLetterTooltip(input: string) {
    // the arrow will point on the most left border of the letter. we want to move it to the center of the letter.
    const letterWidthOffset = this.currentLetterRect.width / 2;
    // we want that the tooltip will hover over the letter.
    const topSpaceOffset = 25;
    const scrollOffset = this.wordBox.current.scrollTop;
    this.props.changeToolTipPosition(
      this.currentLetterRect.left + letterWidthOffset,
      this.currentLetterRect.top - topSpaceOffset - scrollOffset,
      input
    );
  }
  renderLetters(letter: string, index: number) {
    return (
      <LetterUi
        letter={letter}
        isSelected={this.props.index === index}
        input={this.state.input[index]}
        onRefReceive={this.memoizeDomRects}
        key={index}
      />
    );
  }

  get isGameEnd() {
    return this.props.index > this.props.letters.length;
  }
  scrollIntoView() {
    // do not scroll if no changes in the y coordinate of the letters.
    if (
      this.props.currentLetter &&
      this.currentLetterRect.top === this.previousLetterRect.top
    ) {
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
  checkIfFinished() {
    // means we have comleted all the words.
    if (this.props.index === this.props.letters.length) {
      /*
       * update redux that our local game is finished
       * for animation purposes and navigation to result page.
       */
      this.props.gameIsFinished();
      /*
       * update the server that our local game is finished.
       * in purpose of letting our people know that u are finished.
       */

      socketManager.emitFinishedGame();
    }
  }

  get currentLetterNode(): Element | null {
    if (this.letterNodes.length === 0) {
      return null;
    }
    return this.letterNodes[this.props.index];
  }
  get currentLetterRect(): ClientRect | DOMRect {
    return this.lettersRect[this.props.index];
  }
  get previousLetterRect(): ClientRect | DOMRect {
    return this.lettersRect[this.props.index - 1];
  }
  get previousLetterNode(): HTMLElement {
    return this.letterNodes[this.props.index - 1];
  }
  get wordBoxClassNames() {
    return cx('words-box-letters', { disabled: !this.props.gameActive });
  }
  get markerProps(): markerProps {
    if (this.letterNodes.length > 0 && this.props.currentLetter) {
      const { left, top, width, height } = this.currentLetterRect;

      // calculate the position of x,y, with respect to scrolling.
      const y = top - this.wordBoxRect.top;
      const x = left - this.wordBoxRect.left;
      return {
        x,
        y,
        width,
        input: this.props.currentLetter,
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
      <div>
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
