import {
  LOGGED_OUT,
  SDK_LOAD_SUCESS,
  LOGGED_IN,
  FACEBOOK_LOGGED_IN,
  LOGGING_IN_ACTION
} from '../../constants';
import {
  AuthReducer,
  SdkLoadedSuccessAction,
  FacebookStatusAction,
  LoginStatus
} from '../../types';
import AuthenticationManager from '../../AuthenticationManager';

const initialState: AuthReducer = {
  fbSdkLoaded: false,
  loggedIn: AuthenticationManager.isThereAppToken
    ? LoginStatus.loggedIn
    : LoginStatus.loggedOut,
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
    case LOGGING_IN_ACTION:
      return {
        ...state,
        loggedIn: LoginStatus.connecting
      };
    case LOGGED_IN:
      return {
        ...state,
        loggedIn: LoginStatus.loggedIn
      };
    case LOGGED_OUT:
      return {
        ...state,
        loggedIn: LoginStatus.loggedOut
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
