import { connect } from 'react-redux';
import ProgressBar from './ProgressBar';
import { RootState } from '../../types';
import { UserAchievementsI } from '../../types/AchievementsTypes';

const mapStateToProps = (state: RootState) => {
  // const playerId = state.authentication.playerId;
  // const userAchievments = state.userAchievments[playerId];
  const playerId = state.authentication.playerId;
  const userAchievments = state.userAchievments[playerId];
  const progress = calculateUserProgress(userAchievments);
  return { progress };
};

const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgressBar);

function calculateUserProgress(userAchievments: UserAchievementsI): number {
  let completedTasks = 0;
  const {
    maxAccuracy,
    totalChars,
    totalWords,
    maxWpm,
    currentLevelRules
  } = userAchievments;
  if (maxAccuracy > currentLevelRules.accuracy) {
    completedTasks++;
  }
  if (totalChars > currentLevelRules.totalCharsTyped) {
    completedTasks++;
  }
  if (totalWords > currentLevelRules.totalWordsTyped) {
    completedTasks++;
  }
  if (maxWpm > currentLevelRules.wpm) {
    completedTasks++;
  }
  return completedTasks / 4;
}
