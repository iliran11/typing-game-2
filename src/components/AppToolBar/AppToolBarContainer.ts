import { connect } from 'react-redux';
import AppToolBar from './AppToolBar';
import { RootState } from '../../types';

const mapStateToProps = (state: RootState) => {
  return {
    firstName: state.myData.firstName,
    lastName: state.myData.lastName,
    picture: state.myData.picture
  };
};

export default connect(
  mapStateToProps,
  null
)(AppToolBar);
