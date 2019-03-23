import { PLAYER_ID_PARAM } from '../../../constants';
import { ProfilePayload } from '../../../types/typesIndex';
import { userGameHistoryDb } from '../mongoIndex';
import { HighlightsController } from './highlights-controller';

export async function UserAchievementController(req, res) {
  const playerIdParam = req.query[PLAYER_ID_PARAM];
  if (!playerIdParam) {
    res.send(400);
    return;
  }
  const numberGamesWins = await userGameHistoryDb.numberWinsNumberGames(
    playerIdParam
  );
  const highlights = await HighlightsController(playerIdParam);
  const serverResponse: ProfilePayload = {
    achievements: {
      typingTest: {
        mobile: {
          totalGames: numberGamesWins.totalGames.length,
          totalWins: numberGamesWins.wins.length,
          playerId: playerIdParam
        },
        desktop: {
          totalGames: numberGamesWins.totalGames.length,
          totalWins: numberGamesWins.wins.length,
          playerId: playerIdParam
        }
      },
      multiplayer: {
        mobile: {
          totalGames: numberGamesWins.totalGames.length,
          totalWins: numberGamesWins.wins.length,
          playerId: playerIdParam
        },
        desktop: {
          totalGames: numberGamesWins.totalGames.length,
          totalWins: numberGamesWins.wins.length,
          playerId: playerIdParam
        }
      },
      playerId: playerIdParam
    },
    highlights: {
      typingTest: {
        mobile: highlights,
        desktop: highlights
      },
      multiplayer: {
        mobile: highlights,
        desktop: highlights
      },
      playerId: playerIdParam
    }
  };
  res.send(serverResponse);
}
