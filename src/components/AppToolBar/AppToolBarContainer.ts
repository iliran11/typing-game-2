import { connect } from 'react-redux';
import AppToolBar from './AppToolBar';
import { RootState } from '../../types';
import { pictureByFacebookId } from '../../utilities';

const mapStateToProps = (state: RootState) => {
  return {
    firstName: state.myData.firstName,
    lastName: state.myData.lastName,
    picture: pictureByFacebookId('50')
  };
};

export default connect(
  mapStateToProps,
  null
)(AppToolBar);
