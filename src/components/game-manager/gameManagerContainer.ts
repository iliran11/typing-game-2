import { connect } from "react-redux";
import GameManager from "./GameManager2";

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    letters: state.gameData.letters,
    isGameActive: state.serverStatus.isGameActive
  };
};

export default connect(
  mapStateToProps,
  null
)(GameManager);
