import { IGamesHistoryReducer } from '../../../types';
import { LOAD_GAME_HISTORY_DATA } from '../../../constants';

const initialState: IGamesHistoryReducer = {
  gameHistories: [],
  isFetched: false
};

export default function GamesHistoryReducer(
  state: IGamesHistoryReducer = initialState,
  action: any
) {
  switch (action.type) {
    case LOAD_GAME_HISTORY_DATA:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
