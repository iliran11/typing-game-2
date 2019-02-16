import { connect } from 'react-redux';
import GameManager from './GameController2';
import { gameIsFinished } from '../../store/gameAction';
import { RootState } from '../../types/typesIndex';

const mapStateToProps = (state: RootState, ownProps: any) => {
  return {
    words: state.gameData.words
  };
};

const mapDispatchToProps = {
  gameIsFinished
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameManager);
