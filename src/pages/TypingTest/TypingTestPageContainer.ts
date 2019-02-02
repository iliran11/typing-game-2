import { connect } from 'react-redux';
import TypingTestPage from './TypingTest';
const mapDispatchToProps = {};
const mapStateToProps = (state: any, props: any) => {
  return {};
};
export const TypingTestPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TypingTestPage);
