import { connect } from 'react-redux';
import Stats from './Stats';
import { RootState } from '../../../../types';
const mapDispatchToProps = {};
const mapStateToProps = (state: RootState, props: any) => {
  const playerId = state.authentication.playerId;
  const userAchievments = state.userAchievments[playerId];
  return {
    currentWpm: userAchievments.maxWpm,
    currentAccuracy: userAchievments.maxAccuracy,
    currentTotalWordsTyped: userAchievments.totalWords,
    currentTotalTyped: userAchievments.totalChars,
    targetWpm: -2,
    targetAccuracy: -2,
    targetTotalWordsTyped: -2,
    totalCharsTyped: -2
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stats);
