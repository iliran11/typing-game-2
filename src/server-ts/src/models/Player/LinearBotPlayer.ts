import { BotPlayer } from './BotPlayer';
import { BasePlayersOptions } from './BasePlayer';
const random = require('lodash.random');

export interface LinearBotPlayerOpts extends BasePlayersOptions {
  startingPoint: number;
  slope: number;
}

export class LinearBotPlayer extends BotPlayer {
  slope: number;
  startingPoint: number;
  constructor(options: LinearBotPlayerOpts) {
    super(options);
    this.slope = options.slope;
    this.startingPoint = options.startingPoint;
  }
  calculateCurrentWpm(timeFraction) {
    const random = require('lodash.random');
    return this.slope * timeFraction + this.startingPoint;
  }
}
