import { connect } from 'react-redux';
import { AppToolBar, AppToolBarProps } from './AppToolBar';
import { RootState } from '../../types';
import { pictureByFacebookId, userHasAchievements } from '../../utilities';
import { leaveGame } from '../../store/gameAction';
import { logout } from '../../store/authAction';

const mapStateToProps = (state: RootState, ownProps: any) => {
  const appToolbarProps: AppToolBarProps = {
    firstName: state.myData.firstName,
    lastName: state.myData.lastName,
    picture: pictureByFacebookId(state.myData.facebookId),
    loggedIn: state.authentication.loggedIn,
    userHasAchievements: userHasAchievements(state),
    ...ownProps
  };
  return appToolbarProps;
};

const mapDispatchToProps = {
  leaveGame,
  logout
};
export const AppToolBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppToolBar);
