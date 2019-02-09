import * as React from 'react';
import { Word } from './Word';
import Marker, { markerProps } from '../Marker';
import './game.css';
// no updated definitions for this library. that's a way to workaround it.
const scrollIntoView = require('scroll-into-view');

interface GameViewProps {
  letters: string[];
  currentLetter: string;
  gameActive: boolean;
  notifyServerOnFinish: boolean;
  changeToolTipPosition: (x: number, y: number, input: string) => void;
  closeTooltip: () => void;
  gameIsFinished: () => void;
}

interface State {
  input: string[];
}

export default class GameView extends React.Component<any, State> {
  constructor(props: GameViewProps) {
    super(props);
    this.state = {
      input: []
    };
    this.renderWords = this.renderWords.bind(this);
  }
  renderWords(word: string, index: number) {
    return <Word word={word} />;
  }
  render() {
    return <div id="words-box">{this.props.letters.map(this.renderWords)}</div>;
  }
}

//@ts-ignore
GameView.defaultProps = {
  notifyServerOnFinish: true
};
