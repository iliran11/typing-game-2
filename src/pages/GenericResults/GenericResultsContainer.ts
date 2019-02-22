import { connect } from 'react-redux';
import { GenericResultPage } from './GenericResultPage';
import { ROOM_ID_PARM, ROOM_TYPE_PARAM, MY_ID_PARAM } from '../../constants';
import {
  RootState,
  RoomType,
  TypingGameInfoI,
  PlayerGameStatus
} from '../../types/typesIndex';
import { fetchReplay } from '../../store/gameAction';

const mapDispatchToProps = { fetchReplay };
const mapStateToProps = (state: RootState, props: any) => {
  const queryString = require('query-string');
  const roomId = queryString.parse(props.location.search)[ROOM_ID_PARM];
  const myId = queryString.parse(props.location.search)[MY_ID_PARAM];
  const roomType: RoomType = queryString.parse(props.location.search)[
    ROOM_TYPE_PARAM
  ];
  const players = getPlayersStatus(state, roomId, roomType);

  return {
    roomId,
    roomType,
    myId: state.serverStatus.myId || myId,
    players
  };
};

function getPlayersStatus(
  state: RootState,
  roomId: string,
  roomType: RoomType
): PlayerGameStatus[] | TypingGameInfoI {
  if (roomType === RoomType.MULTIPLAYER) {
    const multiplayerRoom = state.multiplayerMapping[roomId];
    if (multiplayerRoom) {
      const result: PlayerGameStatus[] = [];
      for (const playerStatus in multiplayerRoom.playersGameStatus) {
        result.push(multiplayerRoom.playersGameStatus[playerStatus]);
      }
      return result;
    }
  }
  if (roomType === RoomType.TYPING_TEST) {
    const typingTestRoom = state.typingTest[roomId];
    if (typingTestRoom) {
      return typingTestRoom;
    }
  }
  const gameHistory = state.gamesHistory[roomId];
  if (gameHistory) {
    if (roomType === RoomType.MULTIPLAYER) {
      return gameHistory.finalResult.results;
    }
    if (roomType === RoomType.TYPING_TEST) {
      // @ts-ignore
      return gameHistory;
    }
  }
  return [];
}

export const GenericResultsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GenericResultPage);
