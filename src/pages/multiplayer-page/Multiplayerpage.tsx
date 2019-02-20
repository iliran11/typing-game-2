import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import socketManager from '../../socketManager';
import GameController from '../../components/game-manager/GameController2';
import ScoreBoardContainer from '../../components/CompetitorList/CometitorListContainer';
import CountDown from '../../components/CountDown/CountDown';
import { BoxLoader } from '../../components/boxLoader/boxLoader';
import { RoomType } from '../../types';
import { ROOM_ID_PARM } from '../../constants';

interface Props {
  isGameActive: boolean;
  history: any;
  gameIsLoaded: boolean;
  isSocketConnected: boolean;
  words: string[];
  roomId: string;
}
interface State {
  gameActive: boolean;
  timerActive: boolean;
}

class MultiplayerPage extends PureComponent<Props, State> {
  currentInput: string = '';
  constructor(props: any) {
    super(props);
    socketManager.emitRequestToPlay(RoomType.MULTIPLAYER);
    this.state = {
      timerActive: false,
      gameActive: false
    };
    this.onTimerFinish = this.onTimerFinish.bind(this);
    this.onGameFinish = this.onGameFinish.bind(this);
  }
  componentDidUpdate(prevProps: Props) {
    // game has become active on server - turn on the timer!;
    if (prevProps.isGameActive === false && this.props.isGameActive) {
      this.setState({
        timerActive: true
      });
    }
  }
  onTimerFinish() {
    this.setState({
      timerActive: false,
      gameActive: true
    });
  }
  onGameFinish() {
    this.props.history.push(
      `/multiplayer-game/results?${ROOM_ID_PARM}=${this.props.roomId}`
    );
  }
  render() {
    if (!this.props.roomId || this.props.words.length === 0) {
      return <BoxLoader message="Thinking about your challenge ..." />;
    }
    return (
      <div id="game-page">
        {this.state.timerActive && (
          <CountDown onTimerFinish={this.onTimerFinish} />
        )}
        <GameController
          gameActive={this.state.gameActive}
          gameType={RoomType.MULTIPLAYER}
          words={this.props.words}
          onFinish={this.onGameFinish}
        />
        <ScoreBoardContainer
          history={this.props.history}
          roomId={this.props.roomId}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    isGameActive: state.serverStatus.isGameActive
  };
};
export default connect(mapStateToProps)(MultiplayerPage);
