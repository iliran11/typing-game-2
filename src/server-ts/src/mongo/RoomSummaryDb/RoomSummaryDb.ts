const mongoose = require('mongoose');
import { GameSummryDBI } from '../../../../types/typesIndex';

class RoomSummaryDb {
  private static instance: RoomSummaryDb;
  private scheme: any;
  private model: any;
  private constructor() {
    this.scheme = new mongoose.Schema(
      {},
      { strict: false, collection: 'gameSummary' }
    );
    this.model = mongoose.model('gameSummary', this.scheme);
  }
  async save(data: GameSummryDBI) {
    try {
      const document = new this.model(data);
      return document.save();
    } catch (error) {
      throw new Error(error);
    }
  }
  async updatePlayerFinishedStatus(
    roomId: string,
    playerId: string,
    status: boolean
  ) {
    const result = await this.model.update(
      { roomId, 'finalResult.results.playerId': playerId },
      { $set: { 'finalResult.results.$.hasFinished': status } }
    );
  }
  async updateRoomCompletion(roomId: string, status) {
    console.log(this.model.find({ roomId }));
    const result = await this.model.updateOne({ roomId }, { roomHasFinished: true });
    console.log(result);
  }
  async updateById(searchParam: object, document: object): Promise<void> {
    return this.model.updateOne(searchParam, document);
  }

  async getGamesByUserId(userId: string): Promise<GameSummryDBI[]> {
    try {
      const result = await this.find({ 'players.id': userId });
      const response: GameSummryDBI[] = result.map(game => {
        return game.toObject();
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getGameInfoByGameId(roomId: string): Promise<GameSummryDBI> {
    try {
      const result = await this.model.findOne({ roomId: roomId });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  private async find(opts) {
    return this.model.find(opts);
  }
  private async findOne(opts) {
    return this.model.findOne(opts);
  }
  static getInstance() {
    if (!RoomSummaryDb.instance) {
      RoomSummaryDb.instance = new RoomSummaryDb();
      // ... any one time initialization goes here ...
    }
    return RoomSummaryDb.instance;
  }
}

export const roomSummaryDb = RoomSummaryDb.getInstance();
