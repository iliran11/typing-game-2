import { BotsProperties, botPersonalitiesData } from './BotPersonalitiesData';
import {
  LinearBotPlayer,
  LinearBotPlayerOpts
} from '../../Player/LinearBotPlayer';
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
    if (this.deviceType === DeviceType.UNKNOWN) {
      throw new Error('device not recognized!');
    }
  }
  addBot() {
    const maxRandomNumber = botPersonalitiesData.length;
    let randomNumber = random(0, maxRandomNumber - 1);
    while (this.addedBotsMap[randomNumber]) {
      randomNumber = random(0, maxRandomNumber - 1);
    }
    this.addedBotsMap[randomNumber] = true;
    const botPersona: BotsProperties =
      botPersonalitiesData[randomNumber][this.deviceType];
    const linearBotPlayerOpts: LinearBotPlayerOpts = {
      deviceType: this.deviceType,
      room: this.room,
      startingPoint: random(botPersona.wpmRange[0], botPersona.wpmRange[1]),
      forcedAccuracy: random(botPersona.accuracy[0], botPersona.accuracy[1]),
      slope: random(1, 10),
      avatarUrl: botPersonalitiesData[randomNumber].avatarUrl,
      personaName: botPersonalitiesData[randomNumber].name
    };
    return new LinearBotPlayer(linearBotPlayerOpts);
  }
}
