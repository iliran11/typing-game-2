import { LOAD_PROFILE_ACHIEVEMENTS } from '../../constants';
import { UserAchievmentsReducerI } from '../../types/AchievementsTypes';

const initialState: UserAchievmentsReducerI = {};

export default function UserAchievementsReducer(
  state: UserAchievmentsReducerI = initialState,
  action: any
) {
  switch (action.type) {
    case LOAD_PROFILE_ACHIEVEMENTS:
      return loadSingleUserAchievements(state, action.payload);
    default:
      return state;
  }
}

function loadSingleUserAchievements(
  state: UserAchievmentsReducerI,
  payload: any
) {
  return {
    ...state,
    [payload.playerId]: payload.data
  };
}
