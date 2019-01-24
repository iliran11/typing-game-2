const mongoose = require('mongoose');
import { AchievementsProgressI } from '../../../../types/AchievementsTypes';

class UserProgressDb {
  private static instance: UserProgressDb;
  private scheme: any;
  private model: any;
  private constructor() {
    this.scheme = new mongoose.Schema(
      {},
      { collection: 'player-progress', strict: false }
    );
    this.model = mongoose.model('player-progress', this.scheme);
  }
  createResult(achievement: AchievementsProgressI) {
    const progressInstance = new this.model(achievement);
    progressInstance.save();
  }
  static getInstance() {
    if (!UserProgressDb.instance) {
      UserProgressDb.instance = new UserProgressDb();
      // ... any one time initialization goes here ...
    }
    return UserProgressDb.instance;
  }
  someMethod() {}
}

export const userPorgressDb = UserProgressDb.getInstance();
