import { ServerStatusReducer, PlayerJoiningAction } from '../../../types';

export default function otherPlayerJoining(
  state: ServerStatusReducer,
  action: PlayerJoiningAction
): ServerStatusReducer {
  return {
    ...state,
    players: state.players.concat(action.payload)
  };
}
