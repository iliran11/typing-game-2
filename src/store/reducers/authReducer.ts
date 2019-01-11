import {
  LOGGED_OUT,
  SDK_LOAD_SUCESS,
  LOGGED_IN,
  FACEBOOK_LOGGED_IN,
  LOGGING_IN_ACTION,
  SERVER_HANDSHAKE_RECIEVED,
  FACEBOOK_LOGIN_FAILURE
} from '../../constants';
import {
  AuthReducer,
  SdkLoadedSuccessAction,
  FacebookStatusAction,
  LoginStatus,
  HandShakeData
} from '../../types';
import AuthenticationManager from '../../AuthenticationManager';

const initialState: AuthReducer = {
  fbSdkLoaded: false,
  loggedIn: AuthenticationManager.isThereAppToken
    ? LoginStatus.loggedIn
    : LoginStatus.loggedOut,
  facebookLoggedIn: false,
  facebookToken: null,
  appToken: AuthenticationManager.appToken || '',
  playerId: AuthenticationManager.PlayerId || ''
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
    case SERVER_HANDSHAKE_RECIEVED:
      return handleHandshake(state, action.payload);
    case FACEBOOK_LOGIN_FAILURE:
      return initialState;
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

function handleHandshake(state: AuthReducer, payload: HandShakeData) {
  // if there is no token - it means we are coming from login verification.
  // in this case - we get the token from the local storage.
  // TODO: seperate between SERVER_HANDSHAKE_RECIEVED of login and login-verification.
  if (!payload.appToken) {
    return state;
  }
  return {
    ...state,
    playerId: payload.facebookId,
    appToken: payload.appToken
  };
}
