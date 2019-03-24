import { PLAYER_ID_PARAM } from '../../../constants';
import {
  ProfilePayload,
  DeviceType,
  RoomType
} from '../../../types/typesIndex';
import { userGameHistoryDb } from '../mongoIndex';
import { HighlightsController } from './highlights-controller';

export async function UserAchievementController(req, res) {
  const playerIdParam = req.query[PLAYER_ID_PARAM];
  if (!playerIdParam) {
    res.send(400);
    return;
  }
  const queryMatrix: [RoomType, DeviceType][] = [
    [RoomType.TYPING_TEST, DeviceType.MOBILE],
    [RoomType.TYPING_TEST, DeviceType.DESKTOP],
    [RoomType.MULTIPLAYER, DeviceType.MOBILE],
    [RoomType.MULTIPLAYER, DeviceType.DESKTOP]
  ];
  const numberGamesWinPromises = queryMatrix.map(query => {
    return userGameHistoryDb.numberWinsNumberGames(playerIdParam, ...query);
  });
  const highlightsPromises = queryMatrix.map(query => {
    return HighlightsController(playerIdParam, ...query);
  });
  const bestGamesPromises = queryMatrix.map(query => {
    return userGameHistoryDb.getMaxOneDocumentByQuery(
      {
        playerId: playerIdParam,
        roomType: query[0],
        deviceType: query[1]
      },
      { wpm: -1 }
    );
  });
  const numberGamesWinResults = await Promise.all(numberGamesWinPromises);
  const highlightsResult = await Promise.all(highlightsPromises);
  const bestGames = await Promise.all(bestGamesPromises);
  const serverResponse: ProfilePayload = {
    achievements: {
      typingTest: {
        mobile: {
          totalGames: numberGamesWinResults[0].totalGames.length,
          totalWins: numberGamesWinResults[0].wins.length,
          playerId: playerIdParam
        },
        desktop: {
          totalGames: numberGamesWinResults[1].totalGames.length,
          totalWins: numberGamesWinResults[1].wins.length,
          playerId: playerIdParam
        }
      },
      multiplayer: {
        mobile: {
          totalGames: numberGamesWinResults[2].totalGames.length,
          totalWins: numberGamesWinResults[2].wins.length,
          playerId: playerIdParam
        },
        desktop: {
          totalGames: numberGamesWinResults[3].totalGames.length,
          totalWins: numberGamesWinResults[3].wins.length,
          playerId: playerIdParam
        }
      },
      playerId: playerIdParam
    },
    highlights: {
      typingTest: {
        mobile: highlightsResult[0],
        desktop: highlightsResult[1]
      },
      multiplayer: {
        mobile: highlightsResult[2],
        desktop: highlightsResult[3]
      },
      playerId: playerIdParam
    },
    bestGame: {
      typingTest: {
        mobile: bestGames[0],
        desktop: bestGames[1]
      },
      multiplayer: {
        mobile: bestGames[2],
        desktop: bestGames[3]
      },
      playerId: playerIdParam
    }
  };
  res.send(serverResponse);
}
