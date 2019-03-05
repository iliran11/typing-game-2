import { connect } from 'react-redux';
import { RootState } from '../../types/typesIndex';
import TypingTestPage from './TypingTestPage';
import get from 'lodash.get';
const mapDispatchToProps = {};
const mapStateToProps = (state: RootState, props: any) => {
  const roomId = props.roomId;
  const typingTestInfo = state.typingTest[roomId];
  const gameWords = typingTestInfo ? typingTestInfo.words : [];

  return {
    gameWords,
    roomId
  };
};
export const TypingTestPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TypingTestPage);
