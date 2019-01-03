import { connect } from 'react-redux';
import ProfileHeader from './ProfileHeader';
import { RootState } from '../../types';

const mapStateToProps = (state: RootState) => {
  const playerId = state.authentication.playerId;
  const userAchievments = state.userAchievments[playerId];
  return {
    level: userAchievments.level,
    rank: -20
  };
};

const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileHeader);
