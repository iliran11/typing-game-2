import * as React from 'react';
import socketManager from '../../socketManager';
import GameController from '../../components/game-manager/GameController2';
import { RoomType } from '../../types/typesIndex';
import { TypingTestTimer } from '../../components/TimerRenderProps/TypingTestTimer';
import { TypingTestScoreboardContainer } from './TypingTestScoreboardContainer';
import '../../css/typing-test.scss';
import {
  ROOM_ID_PARM,
  ROOM_TYPE_PARAM,
  TYPING_TEST_DURATION
} from '../../constants';
import { BoxLoader } from '../../components/boxLoader/boxLoader';
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
    socketManager.emitRequestToPlay(RoomType.TYPING_TEST);
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
      socketManager.emitStartTypingTest(this.props.roomId);
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
      return <BoxLoader message="Thinking about your challenge ..." />;
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
