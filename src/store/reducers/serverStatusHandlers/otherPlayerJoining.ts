import { ServerStatusReducer,PlayerJoiningAction } from '../../../types';
import PlayerClient from '../../classes/PlayerClientFactory'

export default function otherPlayerJoining(
  state: ServerStatusReducer,
  action: PlayerJoiningAction
): ServerStatusReducer {
  const opts = {id : action.payload.id,type: action.payload.type }
  return {
    ...state,
    players: state.players.concat(new PlayerClient(opts))
  };
}
