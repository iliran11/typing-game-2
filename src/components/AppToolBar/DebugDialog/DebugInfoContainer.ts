import { connect } from 'react-redux';
import DebugInfo from './DebugInfo';
import packageJson from '../../../../package.json'

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    roomId: state.serverStatus.roomId,
    myId: state.serverStatus.myId,
    players: state.serverStatus.players,
    roomSize: state.serverStatus.roomSize,
    version: packageJson.version
  };
};

export default connect(
  mapStateToProps,
  null
)(DebugInfo);
