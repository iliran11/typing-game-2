import LevelManager from '../classes/LevelManager';
import { PLAYER_ID_PARAM } from '../../../constants';

export default function(req, res) {
  const levelManager = LevelManager.getInstance();
  const playerIdParam = req.query[PLAYER_ID_PARAM];
  if (!playerIdParam) {
    res.send(400);
    return;
  }
  levelManager.retrievePlayerStats(playerIdParam).then(result => {
    const userLevel = result[0].level;
    res.send(result);
  });
}
