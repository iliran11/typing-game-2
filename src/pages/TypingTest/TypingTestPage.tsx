import * as React from 'react';
import { SocketManager } from 'src/middlewares/socketManager';
import { RoomType } from 'src/types/typesIndex';
import { TypingTestScoreboardContainer } from './TypingTestScoreboardContainer';
import 'src/css/pages/typing-test.scss';
import {
  ROOM_ID_PARM,
  ROOM_TYPE_PARAM,
  TYPING_TEST_DURATION
} from 'src/constants';
import {
  BoxLoader,
  GameController,
  TypingTestTimer
} from 'src/components/ComponentsIndex';
export interface TypingTestPageProps {
  gameWords: string[];
  roomId: string;
  history: any;
}

export interface TypingTestPageState {
  timerActive: boolean;
}

export default class TypingTestPage extends React.Component<
  TypingTestPageProps,
  TypingTestPageState
> {
  firstTyping: boolean = false;
  constructor(props: TypingTestPageProps) {
    super(props);
    SocketManager.getInstance().emitRequestToPlay(RoomType.TYPING_TEST);
    this.state = {
      timerActive: false
    };
    this.onFinish = this.onFinish.bind(this);
    this.onFirstInput = this.onFirstInput.bind(this);
  }
  componentDidUpdate(
    prevProps: TypingTestPageProps,
    prevState: TypingTestPageState
  ) {
    if (prevState.timerActive === false && this.state.timerActive) {
      SocketManager.getInstance().emitStartTypingTest(this.props.roomId);
    }
  }
  onFinish() {
    this.props.history.push(
      `/results?${ROOM_ID_PARM}=${this.props.roomId}&${ROOM_TYPE_PARAM}=${
        RoomType.TYPING_TEST
      }`
    );
  }
  get gameDurationSeconds() {
    return TYPING_TEST_DURATION / 1000;
  }
  onFirstInput() {
    if (this.state.timerActive === false) {
      this.setState({
        timerActive: true
      });
    }
  }
  public render() {
    if (!this.props.roomId) {
      return (
        <div className="page">
          <BoxLoader message="Thinking about your challenge ..." />
        </div>
      );
    }
    return (
      <div id="game-page" className="typing-test-scope page">
        <div className="typing-test-timer-row">
          <TypingTestTimer
            isActive={this.state.timerActive}
            render={(timePassed: number) => {
              return (
                <div className="typing-test-timer shadow-3dp">
                  {this.gameDurationSeconds - timePassed}
                </div>
              );
            }}
          />
        </div>
        <TypingTestScoreboardContainer roomId={this.props.roomId} />
        <GameController
          gameActive={true}
          words={this.props.gameWords}
          onInput={this.onFirstInput}
          // gameActive={this.props.gameInfo.isGameActive}
          gameType={RoomType.TYPING_TEST}
          onFinish={this.onFinish}
        />
      </div>
    );
  }
}
