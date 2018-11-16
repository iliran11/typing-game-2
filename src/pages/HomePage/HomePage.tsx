import React from 'react';
import './homepage.css';

export default function Home(props: any): any {
  const navigateToGame = function() {
    props.history.push('/game');
    // console.log(props)
  };
  return <div id="home-page"><button onClick={navigateToGame}>Start!</button></div>;
}
