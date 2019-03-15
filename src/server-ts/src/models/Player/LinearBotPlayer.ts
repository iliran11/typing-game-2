import { BotPlayer } from './BotPlayer';
import { BasePlayersOptions } from './BasePlayer';
const random = require('lodash.random');

export class LinearBotPlayer extends BotPlayer {
  slope: number;
  startingPoint: number;
  constructor(options: BasePlayersOptions) {
    super(options);
    this.slope = random(10, 30);
    this.startingPoint = random(10, 30);
  }
  calculateCurrentWpm(timeFraction) {
    const random = require('lodash.random');
    const startingPoint = random(10, 30);
    return this.slope * timeFraction + this.startingPoint;
  }
}
