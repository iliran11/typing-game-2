import * as io from 'socket.io';
import { BasePlayer, BasePlayersOptions } from './BasePlayer';
import {
  PlayerType,
  FacebookUserType,
  PlayerAvatar
} from '../../../../types/typesIndex';
const random = require('lodash.random');

export interface HumanPlayerOptions extends BasePlayersOptions {
  userData?: FacebookUserType;
}

export class HumanPlayer extends BasePlayer {
  vv;
  userData?: FacebookUserType;
  socket: io.Socket;
  avatarUrl: string;
  constructor(options: HumanPlayerOptions) {
    super(options);
    this.userData = options.userData;
    this.socket = options.socket;
    if (this.userData) {
      const userId = this.userData.id;
      this.avatarUrl = `https://res.cloudinary.com/dujbozubz/image/facebook/w_30,h_30/${userId}.jpg`;
    } else {
      const number = random(1, 15);
      this.avatarUrl = `https://res.cloudinary.com/dujbozubz/image/upload/v1553957600/HumanAvatars/human-avatar${number}.png`;
    }
  }
  get playerType(): PlayerType {
    return PlayerType.human;
  }
  get isAuthenticated() {
    return Boolean(this.userData);
  }
  get playerId(): string {
    if (this.userData) {
      return this.userData.id;
    }
    return super.playerId;
  }
  get name() {
    if (this.userData) {
      return `${this.userData.firstName} ${this.userData.lastName}`;
    } else {
      return super.name;
    }
  }
}
