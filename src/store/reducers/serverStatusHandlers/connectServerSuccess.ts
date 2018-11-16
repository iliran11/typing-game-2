import { ServerStatusReducer, ServerSuccessAction } from '../../../types';

export default function connectServerSuccess(
  state: ServerStatusReducer,
  action: ServerSuccessAction
): ServerStatusReducer {
  return {
    ...state,
    isConnected: true,
    myId: action.payload.myId
  };
}
