import LevelManager from '../classes/LevelManager';

export default function(req, res) {
  LevelManager.processNewResult('10155286331682924',null);
  res.send(200);
}
