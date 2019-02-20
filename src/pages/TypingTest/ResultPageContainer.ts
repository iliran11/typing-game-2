import { connect } from 'react-redux';
import { TypingTestResultPage } from './ResultsPage';
import { ROOM_ID_PARM } from '../../constants';
const mapDispatchToProps = {};
const mapStateToProps = (state: any, ownProps: any) => {
  const queryString = require('query-string');
  const roomId = queryString.parse(ownProps.location.search)[ROOM_ID_PARM];

  return {
    roomId
  };
};
export const ResultTypingTestContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TypingTestResultPage);
