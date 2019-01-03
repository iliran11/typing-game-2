import { connect } from 'react-redux';
import ProgressBar from './ProgressBar';
import { RootState } from '../../types';

const mapStateToProps = (state: RootState) => {
  // const playerId = state.authentication.playerId;
  // const userAchievments = state.userAchievments[playerId];
  return {
    progressToNextLevel: -99
  };
};

const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgressBar);
