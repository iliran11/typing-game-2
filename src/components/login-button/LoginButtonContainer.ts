import { connect } from 'react-redux';
import LoginButton from './LoginButton';
import { RootState } from '../../types';
import AuthenticationManager from '../../AuthenticationManager';
const mapStateToProps = (state: RootState) => {
  return {
    isLogged: state.authentication.loggedIn
  };
};
export default connect(
  mapStateToProps,
  null
)(LoginButton);
