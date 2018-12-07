import {
  LOGGED_OUT,
  SDK_LOAD_SUCESS,
  LOGGED_IN,
  FACEBOOK_LOGGED_IN
} from '../../constants';
import {
  AuthReducer,
  SdkLoadedSuccessAction,
  FacebookStatusAction
} from '../../types';

const initialState: AuthReducer = {
  fbSdkLoaded: false,
  loggedIn: false,
  facebookLoggedIn: false,
  facebookToken: null
};

export default function GameReducer(
  state: AuthReducer = initialState,
  action: any
): AuthReducer {
  switch (action.type) {
    case SDK_LOAD_SUCESS:
      return onSdkLoaded(state);
    case LOGGED_IN:
      return {
        ...state,
        loggedIn: true
      };
    case LOGGED_OUT:
      return {
        ...state,
        loggedIn: false
      };
    case FACEBOOK_LOGGED_IN:
      return facebookStatusCheck(state, action.payload);
    default:
      return state;
  }
}

function onSdkLoaded(state: AuthReducer): AuthReducer {
  return {
    ...state,
    fbSdkLoaded: true
  };
}

function facebookStatusCheck(
  state: AuthReducer,
  payload: FacebookStatusAction
): AuthReducer {
  return {
    ...state,
    facebookLoggedIn: payload.loggedIn,
    facebookToken: payload.token
  };
}
