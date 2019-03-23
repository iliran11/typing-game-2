import { LOAD_PROFILE_ACHIEVEMENTS } from '../../constants';
import {
  UserAchievmentsReducerI,
  GameTypesAchivements
} from '../../types/AchievementsTypes';

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
  payload: GameTypesAchivements
) {
  return {
    ...state,
    [payload.playerId]: payload
  };
}
