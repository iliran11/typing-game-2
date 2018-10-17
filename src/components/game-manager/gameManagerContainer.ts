import { connect } from "react-redux";
import GameManager from "./GamrManager2";

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    letters: state.gameData.letters,
  };
};

export default connect(
  mapStateToProps,
  null
)(GameManager);
