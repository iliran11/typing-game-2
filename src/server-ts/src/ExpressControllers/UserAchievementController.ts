import LevelManager from '../classes/LevelManager';
import { PLAYER_ID_PARAM } from '../../../constants';
import { UserAchievements } from '../../../types';

export default function(req, res) {
  const levelManager = LevelManager.getInstance();
  const playerIdParam = req.query[PLAYER_ID_PARAM];
  if (!playerIdParam) {
    res.send(400);
    return;
  }
  levelManager.retrievePlayerStats(playerIdParam).then(result => {
    const computedResult = [...result];
    computedResult[0] = result[0].level;
    const response: UserAchievements = {
      level: result[0].level,
      maxWpm: result[1],
      totalWords: result[2],
      totalChars: result[3]
    };
    res.send(response);
  });
}
