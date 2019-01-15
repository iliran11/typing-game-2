import { connect } from 'react-redux';
import SetupLevelPanel from './SetupLevelPanel';
import { updateCustomLevel } from '../../../../store/profileActions';
import { RootState } from '../../../../types';

const mapDispatchToProps = { updateCustomLevel };

const mapStateToProps = (state: RootState) => {
  const playerId = state.authentication.playerId;
  const level = state.userAchievments[playerId].level;
  return {
    level
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetupLevelPanel);
