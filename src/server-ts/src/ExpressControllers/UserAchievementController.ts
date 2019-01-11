import LevelManager from '../classes/LevelManager';
import { PLAYER_ID_PARAM } from '../../../constants';
import { UserAchievementsI } from '../../../types';
import { levelsMap } from '../classes/LevelManager';
import { RankingsApp } from '../middlewares/RankingManager';
import { promises } from 'fs';

export default function(req, res) {
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

function handlePlayerStatsResponse(result) {
  const computedResult = [...result];
  computedResult[0] = result[0].level;
  const level = result[0].level;
  const currentLevelRules = levelsMap[`level${level}`];
  return {
    level: result[0].level,
    maxWpm: result[1],
    totalWords: result[2],
    totalChars: result[3],
    maxAccuracy: result[4],
    currentLevelRules
  };
}
