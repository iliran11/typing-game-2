import * as React from 'react';
import { Word } from './Word';
import Marker, { markerProps } from '../Marker';
import { GameDomManager } from './GameDomManager';
import './game.css';
// no updated definitions for this library. that's a way to workaround it.
const scrollIntoView = require('scroll-into-view');

interface GameViewProps {
  letters: string[];
}

interface State {
  input: string[];
}

export default class GameView extends React.Component<any, State> {
  domManager: GameDomManager;
  constructor(props: GameViewProps) {
    super(props);
    this.state = {
      input: []
    };
    this.domManager = new GameDomManager();
    this.renderWords = this.renderWords.bind(this);
  }
  renderWords(word: string, index: number) {
    return <Word letters={word.split('')} key={index} />;
  }
  componentDidUpdate(prevProps: GameViewProps) {
    // console.log(prevProps.letters.length, this.props.letterslength);
    if (prevProps.letters.length === 0 && this.props.letters.length > 0) {
      this.domManager.init();
    }
  }
  render() {
    return <div id="words-box">{this.props.letters.map(this.renderWords)}</div>;
  }
}

//@ts-ignore
GameView.defaultProps = {
  notifyServerOnFinish: true
};
