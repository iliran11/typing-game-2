import LevelManager from '../classes/LevelManager';

export default function(req, res) {
  LevelManager.processNewResult('10155286331682924', null);
  res
    .status(200)
    .send({ version: '0.6.0', enviroment: process.env.SERVER_ENVIROMENT });
}
