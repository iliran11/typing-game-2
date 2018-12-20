import { Game } from '../mongo/Game/GameModel';

export default function GamesHistoryController(req, res) {
  Game.find({}).then(gamesModels => {
    const response = gamesModels.map(game => {
      return game.toObject();
    });
    res.send(response);
  });
}
