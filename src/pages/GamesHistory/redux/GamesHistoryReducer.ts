import { IGamesHistoryReducer } from '../../../types';
import { GameSummryDBI } from '../../../types/schemasTypes';
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
  data: GameSummryDBI[]
) {
  const nextState = { ...state };
  data.forEach((gameHistory: GameSummryDBI) => {
    nextState[gameHistory.roomId] = gameHistory;
  });
  return nextState;
}
