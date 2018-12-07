import { SDK_LOAD_SUCESS } from '../../constants';
import { AuthReducer, SdkLoadedSuccessAction } from '../../types';

const initialState: AuthReducer = {
  fbSdkLoaded: false
};

export default function GameReducer(
  state: AuthReducer = initialState,
  action: any
): AuthReducer {
  switch (action.type) {
    case SDK_LOAD_SUCESS:
      return onSdkLoaded(state, action);
    default:
      return state;
  }
}

function onSdkLoaded(
  state: AuthReducer,
  action: SdkLoadedSuccessAction
): AuthReducer {
  return {
    fbSdkLoaded: true
  };
}
