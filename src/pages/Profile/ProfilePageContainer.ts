import { connect } from 'react-redux';
import MyProfilePage from './ProfilePage';
import { RootState } from '../../types';
import { profileMainLoad } from '../../store/profileActions';

const mapStateToProps = (state: RootState) => {
  const playerId = state.authentication.playerId;
  const isPopulated = calculateDataPopulated(state, playerId);
  return {
    isDataPopulated: isPopulated,
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

function calculateDataPopulated(state: RootState, playerId: string): boolean {
  const dataBranch = state.bestGame[playerId];
  if (!dataBranch) return false;
  return Boolean(
    dataBranch.multiplayer.desktop ||
      dataBranch.multiplayer.mobile ||
      dataBranch.typingTest.desktop ||
      dataBranch.typingTest.mobile
  );
}
