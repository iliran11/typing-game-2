import { connect } from 'react-redux';
import App from './App';
import { initAuthenticationManager } from './store/authAction';

const mapDispatchToProps = {
  initAuthenticationManager
};

export default connect(
  null,
  mapDispatchToProps
)(App);
