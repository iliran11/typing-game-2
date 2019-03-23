const mongoose = require('mongoose');
import { PlayerGameStatus } from '../../../../types/typesIndex';
import { resolve } from 'path';

class UserGameHistoryDb {
  private static instance: UserGameHistoryDb;
  private scheme: any;
  private model: any;
  private constructor() {
    this.scheme = new mongoose.Schema(
      {},
      { collection: 'userGameHistory', strict: false }
    );
    this.model = mongoose.model('userGameHistory', this.scheme);
  }
  async save(data: PlayerGameStatus) {
    const document = new this.model(data);
    return document.save();
  }
  //get number of wins and number of games
  async numberWinsNumberGames(playerId: string) {
    const playerSearch = {
      playerId: playerId,
      hasFinished: true
    };
    const numberOfGames = this.model.find(playerSearch);
    const numberOfWins = this.model.find({ ...playerSearch, rank: 1 });
    const result = await Promise.all([numberOfGames, numberOfWins]);
    return {
      totalGames: result[0],
      wins: result[1]
    };
  }
  async maxField(playerId: string, fieldName: string): Promise<number> {
    try {
      const result = await this.model
        .find({ playerId, hasFinished: true })
        .sort({ [fieldName]: -1 })
        .limit(1);

      if (result.length === 0) {
        return 0;
      }
      const maxField = result[0]._doc[fieldName];
      return maxField;
    } catch (error) {
      throw new Error(error);
    }
  }
  async totalField(playerId: string, fieldName: string): Promise<number> {
    try {
      const match = { $match: { playerId, hasFinished: true } };
      const group = {
        $group: {
          _id: null,
          total: {
            $sum: `$${fieldName}`
          }
        }
      };
      const result = await this.model.aggregate([match, group]);
      if (result.length === 0) {
        return 0;
      }
      return result[0].total;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getMaxOneDocumentByQuery(
    queryObject,
    sortObject
  ): Promise<PlayerGameStatus | null> {
    try {
      const result = await this.model
        .find({ ...queryObject, hasFinished: true })
        .sort(sortObject);
      if (result.length === 0) {
        return null;
      }
      return result[0]._doc;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getRankings(): Promise<any> {
    throw new Error('not in use!');
    const group = {
      $group: {
        _id: '$id',
        maxWpm: { $max: '$score' }
      }
    };
    const sort = { $sort: { maxWpm: -1 } };
    const result = await this.model.aggregate([group, sort]);
    return result;
  }
  static getInstance() {
    if (!UserGameHistoryDb.instance) {
      UserGameHistoryDb.instance = new UserGameHistoryDb();
      // ... any one time initialization goes here ...
    }
    return UserGameHistoryDb.instance;
  }
}

export const userGameHistoryDb = UserGameHistoryDb.getInstance();
