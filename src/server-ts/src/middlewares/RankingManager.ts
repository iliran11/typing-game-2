import { GameRecord } from '../mongo/GameRecord/GameRecordModel';

class RankingsApp {
  static getRanking(playerId): Promise<number> {
    return new Promise((resolve, reject) => {
      GameRecord.getRankings().then(result => {
        const rankingsMap = RankingsApp.transformToRankingMap(result);
        resolve(rankingsMap[playerId].rank);
      });
    });
  }
  static transformToRankingMap(results) {
    const map = {};
    results.forEach((rankingItem, index) => {
      map[rankingItem._id] = { score: rankingItem.maxWpm, rank: index , playerId: rankingItem._id};
    });
    return map;
  }
}

export { RankingsApp };
