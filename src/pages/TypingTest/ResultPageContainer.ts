import { connect } from 'react-redux';
import { TypingTestResultPage } from './ResultsPage';
const mapDispatchToProps = {};
const mapStateToProps = (state: any, props: any) => {
  return {};
};
export const ResultTypingTestContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TypingTestResultPage);
