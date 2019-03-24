/**
 * this component wraps up the multiplayerPage component in order to
 * we want to call multiplayerPage just in time - just when we have the roomId ready from the server.
 */

import * as React from 'react';
import {
  MultiplayerPageContainer,
  TypingTestPageContainer
} from 'src/pages/pagesIndex';
import { BoxLoader } from 'src/components/ComponentsIndex';
import { SocketManager } from 'src/middlewares/socketManager';
import { RoomType, DeviceType } from 'src/types';
import { TCNavigator } from 'src/middlewares/TCNavigations';

export interface GameRouterProps {
  activeRoomId: string | null;
  roomType: RoomType;
  history: any;
  leaveGame: any;
  platform: DeviceType;
}

export class GameRouter extends React.Component<GameRouterProps, any> {
  constructor(props: GameRouterProps) {
    super(props);
    if (props.platform === DeviceType.UNKNOWN) {
      TCNavigator.getInstance().navigateHome();
    }
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
