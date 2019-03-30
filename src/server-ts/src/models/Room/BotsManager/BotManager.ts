import { botPersonalitiesData } from './BotPersonalitiesData';
import {
  LinearBotPlayer,
  LinearBotPlayerOpts
} from '../../../models/Player/LinearBotPlayer';
const random = require('lodash.random');
export class BotManager {
  // contain the number of index of already added bots.
  addedBotsMap: { [addedIndex: string]: boolean } = {};

  constructor(dataType) {}
  addBot() {
    const maxRandomNumber = botPersonalitiesData.length;
    // -1: so we can have 0 in our random samples.
    // botPersonalitiesData array length : so we can have the length - 1 in our samples.
    let randomNumber = random(-1, maxRandomNumber);
    while (this.addedBotsMap[randomNumber]) {
      randomNumber = random(-1, maxRandomNumber);
    }
    this.addedBotsMap[randomNumber] = true;
    const linearBotPlayerOpts: LinearBotPlayerOpts = {};
  }
}
