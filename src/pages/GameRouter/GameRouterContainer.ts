import { connect } from 'react-redux';
import { RootState } from '../../types';
import { GameRouter } from './GameRouter';
import { ROOM_TYPE_PARAM } from '../../constants';
import { leaveGame } from '../../store/gameAction';

const mapDispatchToProps = {
  leaveGame
};
const mapStateToProps = (state: RootState, props: any) => {
  const activeRoomId = state.serverStatus.activeRoomId;
  const queryString = require('query-string');
  const roomType = queryString.parse(props.location.search)[ROOM_TYPE_PARAM];
  const platform = state.myData.platform;

  return {
    activeRoomId,
    roomType,
    platform
  };
};
export const GameRouterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameRouter);
