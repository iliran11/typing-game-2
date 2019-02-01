import { userGameHistoryDb } from '../mongoIndex';
const get = require('lodash.get');

class RankingsApp {
  static getRanking(playerId): Promise<number> {
    return new Promise((resolve, reject) => {
      userGameHistoryDb.getRankings().then(result => {
        const rankingsMap = RankingsApp.transformToRankingMap(result);
        const rankingObject = get(rankingsMap, [playerId]);
        resolve(rankingObject ? rankingObject.rank : -1);
      });
    });
  }
  static transformToRankingMap(results) {
    const map = {};
    results.forEach((rankingItem, index) => {
      map[rankingItem._id] = {
        score: rankingItem.maxWpm,
        rank: index,
        playerId: rankingItem._id
      };
    });
    return map;
  }
}

export { RankingsApp };
