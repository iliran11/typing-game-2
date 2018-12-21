import { IGamesHistoryReducer } from '../../../types';
import {} from '../../../constants';

const initialState: IGamesHistoryReducer = {
  gameHistories: [],
  isFetched: false
};

export default function GamesHistoryReducer(
  state: IGamesHistoryReducer = initialState,
  action: any
) {
  return state;
}
