import { connect } from 'react-redux';
import Home from './HomePage';
import { processInitialAuthentication, doLogin } from '../../store/authAction';

const mapDispatchToProps = {
  processInitialAuthentication,
  login: doLogin
};
const mapStateToProps = (state: any, props: any) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
