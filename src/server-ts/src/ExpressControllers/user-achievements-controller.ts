import { PLAYER_ID_PARAM } from '../../../constants';
import { UserAchievementsI } from '../../../types/AchievementsTypes';
import { RankingsApp } from '../middlewares/RankingManager';
import LevelManager, { levelsMap } from '../models/LevelManager';

export function UserAchievementController(req, res) {
  const levelManager = LevelManager.getInstance();
  const playerIdParam = req.query[PLAYER_ID_PARAM];
  if (!playerIdParam) {
    res.send(400);
    return;
  }
  const playerRankingPromise = RankingsApp.getRanking(playerIdParam);
  const playerStatsPromise = LevelManager.retrievePlayerStats(playerIdParam);

  Promise.all([playerRankingPromise, playerStatsPromise]).then(result => {
    const ranking = result[0];
    const playerStats = handlePlayerStatsResponse(result[1]);
    const serverResponse: UserAchievementsI = {
      ranking,
      ...playerStats
    };
    res.send(serverResponse);
  });
}

function handlePlayerStatsResponse(result): UserAchievementsI {
  const computedResult = [...result];
  computedResult[0] = result[0].level;
  const level = result[0].level;
  const currentLevelRules = levelsMap[`level${level}`];
  return {
    level: result[0].level,
    wpm: result[1],
    totalWordsTyped: result[2],
    totalCharsTyped: result[3],
    accuracy: result[4],
    currentLevelRules,
    ranking: -1
  };
}
