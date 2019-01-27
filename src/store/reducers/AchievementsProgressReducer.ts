import { LOAD_ACHIEVEMENT_PROGRESS } from '../../constants';
import {
  AchievementsProgressReducer,
  AchievementsProgressI
} from '../../types/AchievementsTypes';

const initialState: AchievementsProgressReducer = {};

export default function GameReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case LOAD_ACHIEVEMENT_PROGRESS:
      return loadAchievementProgress(state, action.payload);
    default:
      return state;
  }
}

function loadAchievementProgress(
  state: AchievementsProgressReducer,
  data: AchievementsProgressI
) {
  const roomId = data.roomId;
  return {
    ...state,
    [roomId]: data
  };
}
