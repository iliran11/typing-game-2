import { connect } from 'react-redux';
import MyProfilePage from './ProfilePage';
import { RootState } from '../../types';
import { profileMainLoad } from '../../store/profileActions';

const mapStateToProps = (state: RootState) => {
  const playerId = state.authentication.playerId;
  const userAchievements = state.userAchievments[playerId];
  return {
    isDataPopulated: userAchievements && userAchievements.maxWpm > -1,
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
