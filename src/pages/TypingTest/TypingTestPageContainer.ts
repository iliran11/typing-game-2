import { connect } from 'react-redux';
import { RootState } from '../../types/typesIndex';
import TypingTestPage from './TypingTestPage';
const mapDispatchToProps = {};
const mapStateToProps = (state: RootState, props: any) => {
  return {
    gameInfo: state.typingTest
  };
};
export const TypingTestPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TypingTestPage);
