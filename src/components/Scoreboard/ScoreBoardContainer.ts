import { connect } from "react-redux";
import ScoreBoard from "./ScoreBoard";

const mapStateToProps = (state: any) => {
  return {
    players: state.serverStatus.players,
    myId: state.serverStatus.myId
  };
};

export default connect(mapStateToProps)(ScoreBoard);
