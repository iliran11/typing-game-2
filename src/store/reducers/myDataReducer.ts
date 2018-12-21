import { SERVER_HANDSHAKE_RECIEVED } from '../../constants';
import { MyDataReducer, HandShakeData } from '../../types';

const initialState: MyDataReducer = {
  firstName: '',
  lastName: '',
  facebookId: ''
};

export default function myDataReducer(
  state: MyDataReducer = initialState,
  action: any
) {
  switch (action.type) {
    case SERVER_HANDSHAKE_RECIEVED:
      return handshakeDataRecieved(state, action.payload);
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
