import { connect } from 'react-redux';
import DebugInfo from './DebugInfo';

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    roomId: state.serverStatus.roomId,
    myId: state.serverStatus.myId,
    players: state.serverStatus.players
  };
};

export default connect(
  mapStateToProps,
  null
)(DebugInfo);
