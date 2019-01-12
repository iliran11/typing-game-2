import { connect } from 'react-redux';
import AppToolBar, { AppToolBarProps } from './AppToolBar';
import { RootState } from '../../types';
import { pictureByFacebookId } from '../../utilities';
import { leaveGame } from '../../store/gameAction';

const mapStateToProps = (state: RootState, ownProps: any) => {
  const appToolbarProps: AppToolBarProps = {
    firstName: state.myData.firstName,
    lastName: state.myData.lastName,
    picture: pictureByFacebookId(state.myData.facebookId),
    loggedIn: state.authentication.loggedIn,
    ...ownProps
  };
  return appToolbarProps;
};

const mapDispatchToProps = {
  leaveGame
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppToolBar);
