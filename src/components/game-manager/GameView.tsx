import React, { Fragment } from 'react';
import { Word } from './Word';
import Marker, { markerProps } from '../Marker';
import { gameDomManager } from './GameDomManager';
import ToolTip from '../tooltip';
import './game.css';

interface GameViewProps {
  words: string[];
  gameActive: boolean;
  onFinish: () => void;
}

interface State {
  input: string[];
}

export default class GameView extends React.PureComponent<any, State> {
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
    if (prevProps.gameActive === false && this.props.gameActive) {
      gameDomManager.activateGame();
    }
  }
  componentDidMount() {
    gameDomManager.init(
      this.props.words,
      this.props.gameActive,
      this.props.onFinish
    );
  }
  render() {
    console.log('game view');
    return (
      <Fragment>
        <div id="words-box">
          {this.props.words.map(this.renderWords)}
          <Marker />
        </div>
        <ToolTip />
      </Fragment>
    );
  }
}

//@ts-ignore
GameView.defaultProps = {
  notifyServerOnFinish: true
};
