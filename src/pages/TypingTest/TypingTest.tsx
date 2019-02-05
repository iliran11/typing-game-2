import * as React from 'react';
import socketManager from '../../socketManager';
import { RoomType } from '../../types/typesIndex';
import GameController from '../../components/game-manager/GameController';

export interface TypingTestPageProps {}

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
        <GameController letters={['a', 'b']} gameActive={true} />
      </div>
    );
  }
}
