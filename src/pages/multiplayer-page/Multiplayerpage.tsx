import React, { PureComponent } from 'react';
import {
  GameController,
  CountDown,
  CompetitorListContainer
} from 'src/components/ComponentsIndex';
import { MY_ID_PARAM, ROOM_ID_PARM, ROOM_TYPE_PARAM } from '../../constants';
import { SocketManager } from '../../middlewares/socketManager';
import { RoomType } from '../../types';

interface Props {
  isGameActive: boolean;
  history: any;
  isSocketConnected: boolean;
  words: string[];
  roomId: string;
  myId: string;
  onGameFinish: (roomId: string) => {};
}
interface State {
  gameActive: boolean;
  timerActive: boolean;
}

class MultiplayerPage extends PureComponent<Props, State> {
  currentInput: string = '';
  constructor(props: any) {
    super(props);
    this.state = {
      timerActive: props.isGameActive,
      gameActive: false
    };
    this.onTimerFinish = this.onTimerFinish.bind(this);
    this.onGameFinish = this.onGameFinish.bind(this);
  }
  componentDidMount() {
    const bodyNode = document.querySelector('body');
  }
  componentWillUnmount() {
    if (!this.props.history.location.pathname.includes('/results')) {
      SocketManager.getInstance().emitLeaveGame(
        this.props.roomId,
        RoomType.MULTIPLAYER
      );
    }
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
      `/results?${ROOM_ID_PARM}=${this.props.roomId}&${ROOM_TYPE_PARAM}=${
        RoomType.MULTIPLAYER
      }&${MY_ID_PARAM}=${this.props.myId}`
    );
    this.props.onGameFinish(this.props.roomId);
  }
  render() {
    return (
      <div id="multiplayer-game" className="page full-width">
        {this.state.timerActive && (
          <CountDown onTimerFinish={this.onTimerFinish} />
        )}
        <CompetitorListContainer
          history={this.props.history}
          roomId={this.props.roomId}
        />
        <GameController
          gameActive={this.state.gameActive}
          gameType={RoomType.MULTIPLAYER}
          words={this.props.words}
          onFinish={this.onGameFinish}
        />
      </div>
    );
  }
}
export default MultiplayerPage;
