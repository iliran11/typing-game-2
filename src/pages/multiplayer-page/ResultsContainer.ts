import { connect } from 'react-redux';
import { MultiplayerResultPage } from './ResultsPage';
import { ROOM_ID_PARM } from '../../constants';
const mapDispatchToProps = {};
const mapStateToProps = (state: any, props: any) => {
  const queryString = require('query-string');
  const roomId = queryString.parse(props.location.search)[ROOM_ID_PARM];

  return {
    roomId
  };
};
export const MultiPlayerResultPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(MultiplayerResultPage);
