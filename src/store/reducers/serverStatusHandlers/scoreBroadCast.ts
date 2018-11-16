import { PlayerClient,ServerStatusReducer,ScoreBroadcastAction } from '../../../types';

export default function youJoinedRoom(
  state: ServerStatusReducer,
  action: ScoreBroadcastAction
): ServerStatusReducer {
  const nextPlayers = state.players.map(
    (player: PlayerClient, index: number) => {
      // TODO: implement PlayerScore type here like in the server.
      const {
        score,
        completedPercntage,
        finishedTimestamp,
        gameDuration,
        accuracy
      } = action.payload.players[index];
      player.score = score;
      player.compeletedPercntage = completedPercntage;
      player.finishedTimestamp = finishedTimestamp;
      player.gameDuration = gameDuration;
      player.accuracy = accuracy;
      return player;
    }
  );
  return {
    ...state,
    players: nextPlayers
  };
}
