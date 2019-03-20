import { connect } from 'react-redux';
import ProgressBar from './ProgressBar';
import { RootState } from '../../types';
import { UserAchievementsI } from '../../types/AchievementsTypes';

const mapStateToProps = (state: RootState) => {
  // const playerId = state.authentication.playerId;
  // const userAchievments = state.userAchievments[playerId];
  const playerId = state.authentication.playerId;
  const userAchievments = state.userAchievments[playerId];
  // const progress = calculateUserProgress(userAchievments);
  // return { progress };
  return {};
};

const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgressBar);

// function calculateUserProgress(userAchievments: UserAchievementsI): number {
//   let completedTasks = 0;
//   const {
//     accuracy,
//     totalCharsTyped,
//     totalWordsTyped,
//     wpm,
//     currentLevelRules
//   } = userAchievments;
//   if (accuracy > currentLevelRules.accuracy) {
//     completedTasks++;
//   }
//   if (totalCharsTyped > currentLevelRules.totalCharsTyped) {
//     completedTasks++;
//   }
//   if (totalWordsTyped > currentLevelRules.totalWordsTyped) {
//     completedTasks++;
//   }
//   if (wpm > currentLevelRules.wpm) {
//     completedTasks++;
//   }
//   return completedTasks / 4;
// }
