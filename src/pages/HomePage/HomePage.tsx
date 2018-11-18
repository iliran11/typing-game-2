import React from 'react';
import './homepage.css';
import Keyboard from '../../components/keyboard/keyboard';

export default function Home(props: any): any {
  const navigateToGame = function() {
    props.history.push('/game');
    // console.log(props)
  };
  return (
    <React.Fragment>
      <Keyboard />
      <button id="compete-now" className="button-large gradient-5" onClick={navigateToGame}>Compete Now</button>
    </React.Fragment>
  );
  // return <div id="home-page"><button onClick={navigateToGame}>Start!</button></div>;
}
