import React from 'react';
import Medal from '../../components/Medal/Medal';

interface Props {
  speed: number;
  numberOfLetters: number;
  gameDuration: number;
  ranking: number;
  accuracy:number;
}
export default function MyScoreSection(props: Props) {
  const gameDurationSeconds = Math.round(props.gameDuration / 1000);
  return (
    <div id="my-score-data" className="gradient-7">
      <h1>Your Score:</h1>
      <div id="score-section-star">
        <Medal>
          <span className="larger-text">{getMedalText(props.ranking)}</span>
        </Medal>
      </div>
      <div id="score-details">
        <span>Speed:{props.speed} wpm</span>
        <br />
        <span>Accuracy:</span>
      <span>{Math.round(props.accuracy * 100)}%</span>
      <br />
        <span>Typed </span>
        {props.numberOfLetters}
        <span> letters in </span>
        <span>{gameDurationSeconds}</span> seconds
      </div>
    </div>
  );
}

function getMedalText(ranking: number) {
  switch (ranking) {
    case 0:
      return '1st';
    case 1:
      return '2nd';
    case 2:
      return '3rd';
    default:
      return `${ranking+1}th`
  }
}
