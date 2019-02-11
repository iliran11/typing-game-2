import React, { Fragment } from 'react';
import { Word } from './Word';
import Marker, { markerProps } from '../Marker';
import { gameDomManager } from './GameDomManager';
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
  constructor(props: GameViewProps) {
    super(props);
    this.state = {
      input: []
    };
    this.renderWords = this.renderWords.bind(this);
  }
  renderWords(word: string, index: number) {
    return <Word letters={word.split('')} key={index} />;
  }
  componentDidUpdate(prevProps: GameViewProps) {
    // console.log(prevProps.letters.length, this.props.letterslength);
    if (prevProps.letters.length === 0 && this.props.letters.length > 0) {
      gameDomManager.init(this.props.letters);
    }
  }
  render() {
    return (
      <Fragment>
        <div id="words-box">{this.props.letters.map(this.renderWords)}</div>
        {this.props.gameActive && <Marker />}
      </Fragment>
    );
  }
}

//@ts-ignore
GameView.defaultProps = {
  notifyServerOnFinish: true
};
