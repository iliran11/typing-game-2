import {PlayerClient,PlayerType} from '../../types'
import {EMPTY_COMPETITOR_SLOT} from '../../constants'
 
export default class PlayerClientFactory implements PlayerClient {
  id: string = EMPTY_COMPETITOR_SLOT;
  playerId: string ="";
  score: number = 0;
  compeletedPercntage: number = 0;
  type: PlayerType =PlayerType.bot;
  hasLeft: boolean = false;
  isFinished: boolean = false;
  finishedTimestamp: number= -1;
  gameDuration: number = -1;
  accuracy: number = -1;

  constructor(opts: any) {
    this.id = opts.id || this.id
    this.type = opts.type || this.type
  }
}