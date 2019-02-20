import * as React from 'react';
import socketManager from '../../socketManager';
import GameController from '../../components/game-manager/GameController2';
import { TypingGameInfoI, RoomType } from '../../types/typesIndex';
import { TypingTestTimer } from '../../components/TimerRenderProps/TimerRenderProps';
import { TypingTestScoreboardContainer } from './TypingTestScoreboardContainer';
import '../../css/typing-test.scss';
import { ROOM_ID_PARM } from '../../constants';

export interface TypingTestPageProps {
  gameWords: string[];
  roomId: string;
  history: any;
}

export interface TypingTestPageState {}

export default class TypingTestPage extends React.Component<
  TypingTestPageProps,
  TypingTestPageState
> {
  constructor(props: TypingTestPageProps) {
    super(props);
    socketManager.emitRequestToPlay(RoomType.TYPING_TEST);
    this.state = {};
    this.onFinish = this.onFinish.bind(this);
  }
  onFinish() {
    this.props.history.push(
      `/typing-test/results?${ROOM_ID_PARM}=${this.props.roomId}`
    );
  }
  public render() {
    return (
      <div id="game-page" className="typing-test-scope page">
        <div className="typing-test-timer-row">
          <TypingTestTimer
            isActive={true}
            render={(timePassed: number) => {
              return (
                <div className="typing-test-timer shadow-3dp">{timePassed}</div>
              );
            }}
          />
        </div>
        <TypingTestScoreboardContainer roomId={this.props.roomId} />
        <GameController
          gameActive={true}
          words={this.props.gameWords}
          // gameActive={this.props.gameInfo.isGameActive}
          gameType={RoomType.TYPING_TEST}
          onFinish={this.onFinish}
        />
      </div>
    );
  }
}
