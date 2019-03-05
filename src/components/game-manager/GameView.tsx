import React, { Fragment } from 'react';
import { Word } from './Word';
import Marker, { markerProps } from '../Marker';
import { GameDomManager } from './GameDomManager';
import ToolTip from '../tooltip';
import './game.css';

interface GameViewProps {
  words: string[];
  gameActive: boolean;
  gameDomManager: GameDomManager;
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
    this.initDomManager = this.initDomManager.bind(this);
  }
  renderWords(word: string, index: number) {
    return <Word letters={word.split('')} key={index} />;
  }
  initDomManager() {
    this.props.gameDomManager.init(
      this.props.words,
      this.props.gameActive,
      this.props.onFinish
    );
  }
  componentDidUpdate(prevProps: GameViewProps) {
    if (prevProps.gameActive === false && this.props.gameActive) {
      this.props.gameDomManager.activateGame();
    }
    if (prevProps.words.length === 0 && this.props.words.length > 0) {
      this.initDomManager();
    }
  }
  componentDidMount() {
    if (this.props.words.length > 0) {
      this.initDomManager();
    }
  }
  render() {
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
