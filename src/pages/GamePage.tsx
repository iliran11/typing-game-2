import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import socketManager from '../socketManager';
import GameManagerContainer from '../components/game-manager/gameManagerContainer';
import ScoreBoardContainer from '../components/Scoreboard/ScoreBoardContainer';
import CountDown from '../components/CountDown/CountDown';

interface Props {
  isGameActive: boolean;
}
interface State {
  timerActive: boolean;
  gameActive: boolean;
}

class GamePage extends PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
    socketManager.initSocket(props.dispatch);
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
        {this.state.timerActive && (
          <CountDown onTimerFinish={this.onTimerFinish} />
        )}
        <ScoreBoardContainer />
        <GameManagerContainer gameActive={this.state.gameActive}/>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    isGameActive: state.serverStatus.isGameActive
  };
};
export default connect(mapStateToProps)(GamePage);
