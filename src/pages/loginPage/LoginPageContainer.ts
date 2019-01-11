import { connect } from 'react-redux';
import LoginPage from './LoginPage';
import { loginInProgress } from '../../store/authAction';
import { RootState } from '../../types';

const mapStateToProps = (state: RootState) => {
  return {
    connectionStatus: state.authentication.loggedIn
  };
};
export default connect(
  mapStateToProps,
  { loginInProgress }
)(LoginPage);
