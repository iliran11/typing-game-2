import { connect } from 'react-redux';
import ServerAlertManager from './ServerAlertsManager';
import { RootState } from '../../../types';
const mapDispatchToProps = {};
const mapStateToProps = (state: RootState, props: any) => {
  return {
    isSocketConnected: state.serverStatus.socketConnected,
    gameHasTimeout: state.serverStatus.gameHasTimeout,
    initialSocketConnection: state.serverStatus.initialSocketConnection
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServerAlertManager);
