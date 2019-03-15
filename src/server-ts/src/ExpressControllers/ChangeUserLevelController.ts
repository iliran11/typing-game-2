import { ChangeLevelPayload } from '../../../types';
import LevelManager from '../models/LevelManager';

export default function ChangeUserLevel(req, res) {
  const levelManager = LevelManager.getInstance();
  const bodyPayload: ChangeLevelPayload = req.body;
  const { level, playerId } = bodyPayload;
  if (!level || !playerId) {
    res.send(400);
    return;
  }
  if (level < 1) {
    res.send(400);
    return;
  }
  levelManager
    .setUserCustomLevel(playerId, level)
    .then(() => {
      res.send(200);
    })
    .catch(err => {
      res.status(400).send(err);
    });
}
