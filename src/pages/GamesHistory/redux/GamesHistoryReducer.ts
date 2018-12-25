import { IGamesHistoryReducer, GameModelInterface } from '../../../types';
import { LOAD_GAME_HISTORY_DATA } from '../../../constants';

const initialState: IGamesHistoryReducer = {};

export default function GamesHistoryReducer(
  state: IGamesHistoryReducer = initialState,
  action: any
) {
  switch (action.type) {
    case LOAD_GAME_HISTORY_DATA:
      return loadGameHistoryData(state, action.payload);
    default:
      return state;
  }
}

function loadGameHistoryData(
  state: IGamesHistoryReducer,
  data: GameModelInterface[]
) {
  const nextState = { ...state };
  data.forEach((gameHistory: GameModelInterface) => {
    nextState[gameHistory._id] = gameHistory;
  });
  return nextState;
}
