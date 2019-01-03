import { connect } from 'react-redux';
import MyProfilePage from './ProfilePage';
import { RootState } from '../../types';
import { profileMainLoad } from '../../store/profileActions';

const mapStateToProps = (state: RootState) => {
  const fullName = `${state.myData.firstName} ${state.myData.lastName}`;
  const level = 2;
  const rank = 2103;
  const progressToNextLevel = 0.78;
  return {
    fullName,
    level,
    rank,
    progressToNextLevel,
    playerId: state.myData.facebookId
  };
};

const mapDispatchToProps = {
  profileMainLoad
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyProfilePage);
