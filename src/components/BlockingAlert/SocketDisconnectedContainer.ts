import { connect } from 'react-redux';
import { RootState } from '../../types';
import { BlockingAlert } from './BlockingAlert';
const mapDispatchToProps = {};
const mapStateToProps = (state: RootState, props: any) => {
  return {
    open: !state.serverStatus.socketConnected
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlockingAlert);
