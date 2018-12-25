import {
  ServerStatusReducer,
  ScoreBroadcastAction,
  PlayerGameStatus
} from '../../../types';

export default function youJoinedRoom(
  state: ServerStatusReducer,
  action: ScoreBroadcastAction
): ServerStatusReducer {
  const nextState = { ...state };
  action.payload.players.forEach((player: PlayerGameStatus) => {
    nextState.playersGameStatus[player.id] = player;
  });
  return nextState;
}
