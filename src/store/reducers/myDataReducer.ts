import {
  SERVER_HANDSHAKE_RECIEVED,
  SET_TOUCH_PLATFORM,
  SET_WEB_PLATFORM
} from '../../constants';
import {
  MyDataReducer,
  HandShakeData,
  DeviceType
} from '../../types/typesIndex';
import { platform } from 'os';

const initialState: MyDataReducer = {
  firstName: '',
  lastName: '',
  facebookId: '',
  level: -1,
  platform: DeviceType.UNKNOWN
};

export default function myDataReducer(
  state: MyDataReducer = initialState,
  action: any
) {
  switch (action.type) {
    case SERVER_HANDSHAKE_RECIEVED:
      return handshakeDataRecieved(state, action.payload);
    case SET_TOUCH_PLATFORM:
      return {
        ...state,
        platform: DeviceType.MOBILE
      };
    case SET_WEB_PLATFORM:
      return {
        ...state,
        platform: DeviceType.DESKTOP
      };
    default:
      //TODO: Add LOGGED OUT CASE HERE.
      return state;
  }
}

function handshakeDataRecieved(state: MyDataReducer, payload: HandShakeData) {
  return {
    ...state,
    ...payload
  };
}
