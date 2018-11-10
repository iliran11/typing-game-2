import { connect } from "react-redux";
import GameManager from "./GameManager2";
import {gameIsFinished} from '../../store/gameAction'

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    letters: state.gameData.letters,
  };
};

const mapDispatchToProps = {
  gameIsFinished
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameManager);
