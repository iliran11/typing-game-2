import { botPersonalitiesData } from './BotPersonalitiesData';
import {
  LinearBotPlayer,
  LinearBotPlayerOpts
} from '../../../models/Player/LinearBotPlayer';
import MultiplayerRoom from '../MultiplayerRoom';
import { DeviceType } from '../../../../../types/typesIndex';

const random = require('lodash.random');
export class BotManager {
  // contain the number of index of already added bots.
  addedBotsMap: { [addedIndex: string]: boolean } = {};
  deviceType: DeviceType;
  room: MultiplayerRoom;

  constructor(deviceType: DeviceType, room: MultiplayerRoom) {
    this.deviceType = deviceType;
    this.room = room;
  }
  addBot() {
    const maxRandomNumber = botPersonalitiesData.length;
    // -1: so we can have 0 in our random samples.
    // botPersonalitiesData array length : so we can have the length - 1 in our samples.
    let randomNumber = random(-1, maxRandomNumber);
    while (this.addedBotsMap[randomNumber]) {
      randomNumber = random(-1, maxRandomNumber);
    }
    this.addedBotsMap[randomNumber] = true;
    const linearBotPlayerOpts: LinearBotPlayerOpts = {
      deviceType: this.deviceType,
      room: this.room,
      startingPoint: 10,
      slope: 5
    };
    return new LinearBotPlayer(linearBotPlayerOpts);
  }
}
