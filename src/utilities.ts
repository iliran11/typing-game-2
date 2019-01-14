export function loadFbSdk(appId: string) {
  return new Promise(resolve => {
    // @ts-ignore
    window.fbAsyncInit = function() {
      // eslint-disable-line func-names
      // @ts-ignore
      FB.init({
        appId,
        xfbml: false,
        version: 'v3.2',
        cookie: true
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

export function pictureByFacebookId(
  facebookId: string,
  height: number = 30,
  width: number = 30
) {
  if (!facebookId) {
    return undefined;
  }
  return `https://res.cloudinary.com/dujbozubz/image/facebook/w_${width},h_${height}/${facebookId}.jpg`;
}
