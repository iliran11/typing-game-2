import { LOAD_BEST_GAMES } from '../../constants';
import { ProfileBestGame, BestGameReducerI } from '../../types/typesIndex';

const initialState: BestGameReducerI = {};

export default function BestGameReducer(
  state: BestGameReducerI = initialState,
  action: any
): BestGameReducerI {
  switch (action.type) {
    case LOAD_BEST_GAMES:
      return loadBestGame(state, action.payload);
    default:
      return state;
  }
}

function loadBestGame(
  state: BestGameReducerI,
  payload: ProfileBestGame
): BestGameReducerI {
  return {
    ...state,
    [payload.playerId]: payload
  };
}
