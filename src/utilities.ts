import {
  ScoreSectionsData,
  PlayerGameStatus,
  RootState,
  DeviceType
} from './types/typesIndex';
import { SET_TOUCH_PLATFORM, SET_WEB_PLATFORM } from 'src/constants';

export function loadFbSdk(appId: string) {
  return new Promise(resolve => {
    // @ts-ignore
    window.fbAsyncInit = function() {
      // eslint-disable-line func-names
      // @ts-ignore
      FB.init({
        appId,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v3.2'
      });
      // @ts-ignore
      FB.AppEvents.logPageView();
      resolve('SDK Loaded!');
    };
    (function(d, s, id) {
      // eslint-disable-line func-names
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      const js = d.createElement(s);
      js.id = id;
      // @ts-ignore
      js.src = '//connect.facebook.net/en_US/sdk.js';
      // @ts-ignore
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  });
}

export function getFbLoginStatus() {
  return new Promise(resolve => {
    // @ts-ignore
    window.FB.getLoginStatus(responseStatus => {
      return resolve(responseStatus);
    });
  });
}
// @ts-ignore
export function fbLogin(options) {
  return new Promise(resolve => {
    // @ts-ignore
    window.FB.login(response => resolve(response), options);
  });
}
export function fbLogout() {
  return new Promise(resolve => {
    // @ts-ignore
    window.FB.logout((response: any) => {
      resolve(response);
    });
  });
}

export function pictureByFacebookId(facebookId: string, height: number = 30) {
  if (!facebookId) {
    return undefined;
  }
  return `https://res.cloudinary.com/dujbozubz/image/facebook/w_${height},h_${height}/${facebookId}.jpg`;
}

// export function userHasAchievements(state: RootState) {
//   const playerId = state.authentication.playerId;
//   const userAchievements = state.userAchievments[playerId];
//   return userAchievements && userAchievements.wpm > -1;
// }

export function getTypingTestScoreboardData(
  data: PlayerGameStatus
): ScoreSectionsData[] {
  const accuracy = (data.accuracy * 100).toFixed(0);
  return [
    {
      value: Math.floor(data.wpm),
      label: 'WORDS/MIN'
    },
    {
      value: Math.floor(data.cpm),
      label: 'CHARS/MIN'
    },
    {
      value: `${accuracy}%`,
      label: 'ACCURACY'
    }
  ];
}
// https://stackoverflow.com/questions/15397372/javascript-new-date-ordinal-st-nd-rd-th
export function ordinal(d: number) {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

export function millisecondsToTimeResult(milliseconds: number): string {
  const minutes = Math.floor(milliseconds / 60000);
  const remainedMilliseconds = milliseconds - minutes * 60000;
  const seconds = Math.floor(remainedMilliseconds / 1000);
  return `${number2Digits(minutes)}:${number2Digits(seconds)}`;
}

function number2Digits(number: number): string {
  if (number < 10) return `0${number}`;
  return `${number}`;
}

export function initTouchFlag(dispatch: any, getState: () => RootState) {
  const platform = getState().myData.platform;
  if (platform === DeviceType.DESKTOP || platform === DeviceType.MOBILE) {
    return;
  }
  const body = document.querySelector('body');
  const detectMouse = function(e: any) {
    if (e.type === 'mousedown') {
      // alert('mouse');
      dispatch({
        type: SET_WEB_PLATFORM
      });
    } else if (e.type === 'touchstart') {
      // alert('touch');
      dispatch({
        type: SET_TOUCH_PLATFORM
      });
    }
    // remove event bindings, so it only runs once
    body!.removeEventListener('mousedown', detectMouse);
    body!.removeEventListener('touchstart', detectMouse);
  };
  // attach both events to body
  body!.addEventListener('mousedown', detectMouse);
  body!.addEventListener('touchstart', detectMouse);
}
