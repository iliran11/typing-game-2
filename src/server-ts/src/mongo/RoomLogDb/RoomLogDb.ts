const mongoose = require('mongoose');
import {
  GameRecordsModel,
  RoomType,
  PlayerGameStatus
} from '../../../../types/typesIndex';

class RoomLogDb {
  private static instance: RoomLogDb;
  private scheme: any;
  private model: any;
  private constructor() {
    this.scheme = new mongoose.Schema(
      {},
      { collection: 'roomLog', strict: false }
    );
    this.model = mongoose.model('roomLog', this.scheme);
  }
  async save(
    results: PlayerGameStatus[],
    instanceId: string,
    gameTickSequenceId: number,
    roomType: RoomType
  ): Promise<void> {
    const documentInstance = new this.model({
      results: results,
      gameInstanceId: instanceId,
      gameTickSequenceId,
      roomType
    });
    return documentInstance.save();
  }
  async getRecordsByRoomId(roomId: string): Promise<GameRecordsModel[]> {
    try {
      const result = await this.model
        .find({ gameInstanceId: roomId })
        .sort({ gameTickSequenceId: 1 });
      return result.map(model => model.toObject());
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
