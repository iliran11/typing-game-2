import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import socketManager from '../../socketManager';
import GameManagerContainer from '../../components/game-manager/gameManagerContainer';
import ScoreBoardContainer from '../../components/CompetitorList/CometitorListContainer';
import CountDown from '../../components/CountDown/CountDown';
import { BoxLoader } from '../../components/boxLoader/boxLoader';
import { RoomType } from '../../types';
import ServerAlertManager from './ServerAlertsManager/ServerAlertManagerContainer';

interface Props {
  isGameActive: boolean;
  history: any;
  gameIsLoaded: boolean;
  isSocketConnected: boolean;
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
  render() {
    return (
      <div id="game-page">
        {!this.props.gameIsLoaded && (
          <BoxLoader message="Thinking about your challenge ..." />
        )}
        {this.state.timerActive && (
          <CountDown onTimerFinish={this.onTimerFinish} />
        )}
        <GameManagerContainer
          gameActive={this.state.gameActive}
          gameType={RoomType.MULTIPLAYER}
        />
        <ScoreBoardContainer history={this.props.history} />
        <ServerAlertManager />
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
