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
    results: PlayerGameStatus[],
    instanceId: string,
    gameTickSequenceId: number
  ): Promise<void> {
    const documentInstance = new this.model({
      results: results,
      gameInstanceId: instanceId,
      gameTickSequenceId
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