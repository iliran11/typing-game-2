import { connect } from "react-redux";
import GameManager from "./gameManager";

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    letters: state.gameData.letters
  };
};

export default connect(
  mapStateToProps,
  null
)(GameManager);
