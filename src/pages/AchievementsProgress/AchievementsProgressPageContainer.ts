import { connect } from 'react-redux';
import AchievementProgress, {
  ProgressSectionI
} from './AchievementsProgressPage';
import { ROOM_ID_PARM } from '../../constants';
import { RootState } from '../../types';
import {
  AchievementsProgressI,
  rangeAbleProperties
} from '../../types/AchievementsTypes';
import get from 'lodash.get';
const queryString = require('query-string');

const mapDispatchToProps = {};
const mapStateToProps = (state: RootState, ownProps: any) => {
  const roomId = queryString.parse(ownProps.location.search)[ROOM_ID_PARM];
  const achievementsProgress = state.achievementsProgress[roomId];
  const results = achievementsProgress
    ? getRangeBarProps(achievementsProgress)
    : [];
  return {
    roomId,
    achievementsProgress: results,
    prevLevel: get(achievementsProgress, ['prevAchievement', 'level']),
    nextLevel: get(achievementsProgress, ['nextachievement', 'level'])
  };
};
export const AchievementProgressPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AchievementProgress);

function getRangeBarProps(data: AchievementsProgressI): ProgressSectionI[] {
  const prevAchievements = data.prevAchievement;
  const nextAchievements = data.nextachievement;
  let result: ProgressSectionI[] = [];
  for (var key in nextAchievements) {
    if (rangeAbleProperties[key]) {
      const nextValue = nextAchievements[key];
      const prevValue = prevAchievements[key];
      console.log(prevAchievements, prevValue, key);
      result.push({
        initialValue: prevValue,
        currentValue: nextValue,
        barStartValue: prevAchievements.currentLevelRules[key],
        barEndValue: nextAchievements.currentLevelRules[key],
        title: key,
        duration: 2000
      });
    }
  }
  return result;
}
