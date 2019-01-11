import { connect } from 'react-redux';
import { RootState } from '../../types';
import { SocketDisconnect } from './SocketDisconnect';
const mapDispatchToProps = {};
const mapStateToProps = (state: RootState, props: any) => {
  return {
    socketConnected: state.serverStatus.socketConnected
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocketDisconnect);
