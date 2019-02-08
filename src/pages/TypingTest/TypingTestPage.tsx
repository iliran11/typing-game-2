import * as React from 'react';
import socketManager from '../../socketManager';
import { RoomType } from '../../types/typesIndex';
import GameController from '../../components/game-manager/GameController';
import { TypingGameInfoI } from '../../types/typesIndex';

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
        <GameController
          letters={this.props.gameInfo.letters}
          gameActive={this.props.gameInfo}
        />
      </div>
    );
  }
}
