import { connect } from 'react-redux';
import Home from './HomePage';
import { sdkLoadedSuccess } from '../../store/authAction';

const mapDispatchToProps = {
  sdkLoadedSuccess
};
const mapStateToProps = (state: any, props: any) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
