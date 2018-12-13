import React from 'react';
import AuthenticationManager from '../../AuthenticationManager';

function LoginButton() {
  return (
    <button
      id="compete-now"
      className="button-large gradient-2"
      onClick={facebookLogin}
    >
      Login Now
    </button>
  );
}

function facebookLogin() {
  const authenticationManager = AuthenticationManager.getInstance();
  authenticationManager.login();
}

export default LoginButton;
