import { connect } from 'react-redux';
import Stats from './Stats';
import { RootState } from '../../../../types';
const mapDispatchToProps = {};
const mapStateToProps = (state: RootState, props: any) => {
  const playerId = state.authentication.playerId;
  const userAchievments = state.userAchievments[playerId];
  const {
    wpm: targetWpm,
    totalWordsTyped: targetTotalWordsTyped,
    totalCharsTyped: targetCharsTyped,
    accuracy: targetAccuracy
  } = userAchievments.currentLevelRules;
  return {
    currentWpm: userAchievments.wpm,
    currentAccuracy: userAchievments.accuracy,
    currentTotalWordsTyped: userAchievments.totalWordsTyped,
    currentTotalTyped: userAchievments.totalCharsTyped,
    targetWpm,
    targetAccuracy,
    targetTotalWordsTyped,
    targetCharsTyped
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stats);
