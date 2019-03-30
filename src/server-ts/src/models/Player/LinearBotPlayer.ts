import { BotPlayerOptions, BotPlayer } from './BotPlayer';
import { BasePlayersOptions } from './BasePlayer';
const random = require('lodash.random');

export interface LinearBotPlayerOpts extends BotPlayerOptions {
  startingPoint: number;
  slope: number;
  avatarUrl: string;
}

export class LinearBotPlayer extends BotPlayer {
  slope: number;
  startingPoint: number;
  avatarUrl: string;
  constructor(options: LinearBotPlayerOpts) {
    super(options);
    this.slope = options.slope;
    this.startingPoint = options.startingPoint;
    this.avatarUrl = options.avatarUrl;
  }
  calculateCurrentWpm(timeFraction) {
    const random = require('lodash.random');
    return this.slope * timeFraction + this.startingPoint;
  }
}
