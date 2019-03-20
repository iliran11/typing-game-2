import { connect } from 'react-redux';
import MyProfilePage from './ProfilePage';
import { RootState } from '../../types';
import { profileMainLoad } from '../../store/profileActions';

const mapStateToProps = (state: RootState) => {
  const playerId = state.authentication.playerId;
  return {
    isDataPopulated: true,
    playerId,
    fullName: `${state.myData.firstName} ${state.myData.lastName}`
  };
};

const mapDispatchToProps = {
  profileMainLoad
};
export const MyProfilePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyProfilePage);
