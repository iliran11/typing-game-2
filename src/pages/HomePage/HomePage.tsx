import React from 'react';
import './homepage.css';
import Keyboard from '../../components/keyboard/keyboard';

export default function Home(props: any): any {
  const navigateToGame = function() {
    props.history.push('/game');
    // console.log(props)
  };
  return (
    <div id="home-page">
      <p>
        Improve your typing skills,
        <br />
        by racing with your friends
      </p>
      <Keyboard />
      <button
        id="compete-now"
        className="button-large gradient-5"
        onClick={navigateToGame}
      >
        Compete Now
      </button>
    </div>
  );
  // return <div id="home-page"><button onClick={navigateToGame}>Start!</button></div>;
}
