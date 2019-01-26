import { connect } from 'react-redux';
import AchievementProgress from './AchievementsProgressPage';
import { RangeBarProps } from '../../components/RangeBar/RangeBar';
import { ROOM_ID_PARM } from '../../constants';
import { RootState } from '../../types';
import {
  AchievementsProgressI,
  rangeAbleProperties
} from '../../types/AchievementsTypes';
const queryString = require('query-string');

const mapDispatchToProps = {};
const mapStateToProps = (state: RootState, ownProps: any) => {
  const roomId = queryString.parse(ownProps.location.search)[ROOM_ID_PARM];
  const achievementProgress = getRangeBarProps(
    state.achievementsProgress[roomId]
  );
  return { roomId, achievementProgress };
};
export const AchievementProgressPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AchievementProgress);

function getRangeBarProps(data: AchievementsProgressI): RangeBarProps[] {
  const prevAchievements = data.prevAchievement;
  const nextAchievements = data.nextachievement;
  let result: RangeBarProps[] = [];
  for (var key in nextAchievements) {
    if (rangeAbleProperties[key]) {
      const prevValue = nextAchievements[key];
      const nextValue = prevAchievements[key];
      console.log(prevAchievements, prevValue, key);
      result.push({
        initialValue: prevValue,
        currentValue: nextValue,
        barStartValue: 0,
        barEndValue: 10000,
        duration: 5000
      });
    }
  }
  return result;
}
