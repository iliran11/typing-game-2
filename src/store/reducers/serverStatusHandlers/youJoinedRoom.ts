import { ServerStatusReducer } from '../../../types';

export default function youJoinedRoom(
  state: ServerStatusReducer,
  action: any
): ServerStatusReducer {
  const {roomId = -1 ,players= {}} = action.payload;
  return {
    ...state,
    roomId,
    players,
    roomSize: action.payload.roomSize,
    isGameActive: action.payload.isGameActive,
    myId:action.payload.myId
  }
}
