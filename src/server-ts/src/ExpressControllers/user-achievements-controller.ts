import { PLAYER_ID_PARAM } from '../../../constants';
import { ProfilePayload } from '../../../types';
import { userGameHistoryDb } from '../mongoIndex';

export async function UserAchievementController(req, res) {
  const playerIdParam = req.query[PLAYER_ID_PARAM];
  if (!playerIdParam) {
    res.send(400);
    return;
  }
  const numberGamesWins = await userGameHistoryDb.numberWinsNumberGames(
    playerIdParam
  );
  const serverResponse: ProfilePayload = {
    totalGames: numberGamesWins.totalGames.length,
    totalWins: numberGamesWins.wins.length
  };
  res.send(serverResponse);
}
