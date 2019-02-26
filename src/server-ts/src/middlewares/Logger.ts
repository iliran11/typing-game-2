import { ENTERED } from 'react-transition-group/Transition';

const log4js = require('log4js');
const ROOM_ACTIVITY = 'room-activity';
export enum RoomPersonChange {
  ENTERED = 'ENTERED',
  LEFT = 'LEFT',
  DISCONNECTED = 'DISCONNECTED'
}

class Logger {
  private static instance: Logger;
  private roomActivityLogger: any;
  private constructor() {
    log4js.configure({
      appenders: {
        cheese: { type: 'file', filename: 'cheese.log', flags: 'w' }
      },
      categories: { default: { appenders: ['cheese'], level: 'trace' } }
    });
    this.roomActivityLogger = log4js.getLogger(ROOM_ACTIVITY);
  }
  logRoomPersonChange(
    roomId: string,
    playerId: string,
    change: RoomPersonChange
  ) {
    const message = `[ROOM_ACTIVITY]: "${playerId}" ${change} "${roomId}"`;
    this.roomActivityLogger.info(message);
  }
  static getInstance() {
    if (!Logger.instance) {
      Logger.instance = new Logger();
      // ... any one time initialization goes here ...
    }
    return Logger.instance;
  }
  someMethod() {}
}

let logger = Logger.getInstance(); // do something with the instance...
export { logger };
