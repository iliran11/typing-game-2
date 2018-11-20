import { ServerStatusReducer, PlayerJoiningAction } from '../../../types';
import PlayerClient from '../../classes/PlayerClientFactory';

export default function otherPlayerJoining(
  state: ServerStatusReducer,
  action: PlayerJoiningAction
): ServerStatusReducer {
  const { id, type, avatar } = action.payload;
  const opts = { id, type, avatar };
  return {
    ...state,
    players: state.players.concat(new PlayerClient(opts))
  };
}
