/**
 * this component wraps up the multiplayerPage component in order to
 * we want to call multiplayerPage just in time - just when we have the roomId ready from the server.
 */

import * as React from 'react';
import {
  MultiplayerPageContainer,
  TypingTestPageContainer
} from '../pagesIndex';
import { BoxLoader } from '../../components/boxLoader/boxLoader';
import { SocketManager } from '../../Managers/socketManager';
import { RoomType } from '../../types';

export interface GameRouterProps {
  activeRoomId: string | null;
  roomType: RoomType;
  history: any;
  leaveGame: any;
}

export class GameRouter extends React.Component<GameRouterProps, any> {
  constructor(props: GameRouterProps) {
    super(props);
    SocketManager.getInstance().emitRequestToPlay(props.roomType);
  }
  componentWillUnmount() {
    this.props.leaveGame();
  }
  onGameFinished() {
    SocketManager.getInstance().emitFinishedGame();
  }
  get gameProps() {
    return {
      roomId: this.props.activeRoomId,
      onGameFinish: this.onGameFinished,
      history: this.props.history
    };
  }
  public render() {
    if (this.props.activeRoomId) {
      switch (this.props.roomType) {
        case RoomType.MULTIPLAYER:
          return <MultiplayerPageContainer {...this.gameProps} />;
        case RoomType.TYPING_TEST:
          return <TypingTestPageContainer {...this.gameProps} />;
        default:
          throw new Error(
            'bad param - room type param must be multiplayer or typing test'
          );
          break;
      }
    } else {
      return <BoxLoader message="Thinking about your challenge ..." />;
    }
  }
}
