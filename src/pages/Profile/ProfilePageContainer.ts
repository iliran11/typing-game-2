import { connect } from 'react-redux';
import MyProfilePage from './ProfilePage';
import { RootState } from '../../types';
import { profileMainLoad } from '../../store/profileActions';
import { userHasAchievements } from '../../utilities';

const mapStateToProps = (state: RootState) => {
  const playerId = state.authentication.playerId;
  return {
    isDataPopulated: userHasAchievements(state),
    playerId,
    fullName: `${state.myData.firstName} ${state.myData.lastName}`
  };
};

const mapDispatchToProps = {
  profileMainLoad
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyProfilePage);
