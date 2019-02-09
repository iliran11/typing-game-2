import * as React from 'react';
import socketManager from '../../socketManager';
import GameController from '../../components/game-manager/GameController';
import { TypingGameInfoI, RoomType } from '../../types/typesIndex';
import { TypingTestTimer } from '../../components/TimerRenderProps/TimerRenderProps';
import {
  TypingTestScoreboard,
  TypingTestScoreboardProps
} from './TypingTestScoreboard';
import '../../css/typing-test.scss';

const scoreboardData: TypingTestScoreboardProps = {
  data: [
    { value: 12, label: 'WORDS/MIN' },
    { value: 77, label: 'CHARS/MIN' },
    { value: '94%', label: 'ACCURACY' }
  ]
};
export interface TypingTestPageProps {
  gameInfo: TypingGameInfoI;
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
  }
  public render() {
    return (
      <div id="game-page">
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
        <TypingTestScoreboard {...scoreboardData} />
        <GameController
          letters={this.props.gameInfo.letters}
          gameActive={this.props.gameInfo.isGameActive}
          gameType={RoomType.TYPING_TEST}
        />
      </div>
    );
  }
}
