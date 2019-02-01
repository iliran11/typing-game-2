const mongoose = require('mongoose');
import { TypingModelI } from '../../../../types/typesIndex';

class TypingDb {
  private static instance: TypingDb;
  private scheme: any;
  private model: any;
  private constructor() {
    this.scheme = new mongoose.Schema(
      {},
      { collection: 'typings', strict: false }
    );
    this.model = mongoose.model('typings', this.scheme);
  }
  async save(data: TypingModelI): Promise<void> {
    const instance = new this.model(data);
    return instance.save();
  }
  async getTypingsOfPlayerInGame(
    gameId: string,
    playerId: string
  ): Promise<TypingModelI[]> {
    try {
      const queryResult = await this.model
        .find({ gameId, playerId })
        .sort({ gameTimeStamp: 1 });
      const result: TypingModelI[] = queryResult.map(doc => doc.toObject());
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }
  static getInstance() {
    if (!TypingDb.instance) {
      TypingDb.instance = new TypingDb();
      // ... any one time initialization goes here ...
    }
    return TypingDb.instance;
  }
}

export const typingDb = TypingDb.getInstance();
