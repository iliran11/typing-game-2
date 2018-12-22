import { Game } from '../mongo/Game/GameModel';
import { USER_ID_PARAM } from '../../../constants';
import { GameModelInterface } from '../../../types';

export default function GamesHistoryController(req, res) {
  const searchParamaer = req.query[USER_ID_PARAM];
  if (!searchParamaer) {
    res.send(400);
    return;
  }
  Game.getGamesByUserId(searchParamaer)
    .then((result: GameModelInterface[]) => {
      res.send(result);
    })
    .catch(error => {
      console.log(error);
      res.send(500);
    });
}
