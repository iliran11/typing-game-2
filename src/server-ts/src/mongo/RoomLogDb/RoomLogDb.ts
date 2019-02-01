const mongoose = require('mongoose');
import {
  GameRecordsModel,
  PlayerGameStatus
} from '../../../../types/typesIndex';

class RoomLogDb {
  private static instance: RoomLogDb;
  private scheme: any;
  private model: any;
  private constructor() {
    this.scheme = new mongoose.Schema(
      {},
      { collection: 'room-log', strict: false }
    );
    this.model = mongoose.model('room-log', this.scheme);
  }
  async save(
    models: PlayerGameStatus[],
    instanceId: string,
    gameTickSequenceId: number
  ): Promise<void> {}
  async getRecordsByRoomId(roomId: string): Promise<GameRecordsModel[]> {
    try {
      return await this.model
        .find({ gameInstanceId: roomId })
        .sort({ gameTickSequenceId: 1 })
        .exec();
    } catch (error) {
      throw new Error(error);
    }
  }
  static getInstance() {
    if (!RoomLogDb.instance) {
      RoomLogDb.instance = new RoomLogDb();
      // ... any one time initialization goes here ...
    }
    return RoomLogDb.instance;
  }
  someMethod() {}
}

export const roomLogDb = RoomLogDb.getInstance();
