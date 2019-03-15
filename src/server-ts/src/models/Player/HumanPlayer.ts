import * as io from 'socket.io';
import { BasePlayer, BasePlayersOptions } from './BasePlayer';
import {
  PlayerType,
  FacebookUserType,
  PlayerAvatar
} from '../../../../types/typesIndex';

export interface HumanPlayerOptions extends BasePlayersOptions {
  userData?: FacebookUserType;
}

export class HumanPlayer extends BasePlayer {
  isAuthenticated: boolean;
  userData?: FacebookUserType;
  identifier: io.Socket;
  constructor(options: HumanPlayerOptions) {
    super(options);
    this.userData = options.userData;
    this.isAuthenticated = Boolean(this.userData);
  }

  get playerType(): PlayerType {
    return PlayerType.human;
  }
  get avatar(): PlayerAvatar {
    if (this.userData) {
      return { picture: this.userData.id, isAnonymous: false };
    }
    return super.avatar;
  }
  get playerId(): string {
    if (this.userData) {
      return this.userData.id;
    }
    return super.playerId;
  }
  get name() {
    return `${this.playerType} ${BasePlayer.playerCounter}`;
  }
}
