import { LOAD_REPLAY } from '../../constants';
import { ReplayReducer, GameRecordsModel } from '../../types';

const initialState: ReplayReducer = {};

export default function GameReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case LOAD_REPLAY:
      return loadReplay(state, action.payload);
    default:
      return state;
  }
}

function loadReplay(state: ReplayReducer, data: GameRecordsModel[]) {
  const roomId = data[0].gameInstanceId;
  return {
    ...state,
    [roomId]: data
  };
}
