import { connect } from 'react-redux';
import ReplayPage from './ReplayPage';
const queryString = require('query-string');

const mapStateToProps = (state: any, ownProps: any) => {
  const roomId = queryString.parse(ownProps.location.search).roomId;
  return {};
};

export default connect(
  mapStateToProps,
  null
)(ReplayPage);
