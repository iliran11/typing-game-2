import { ServerStatusReducer } from '../../../types';

export default function connectServerSuccess(
  state: ServerStatusReducer,
): ServerStatusReducer {
  return {
    ...state,
    isConnected: true,
  };
}
