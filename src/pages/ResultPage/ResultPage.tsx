import React from 'react';
import MyScoreSection from './MyScoreSection';
import ResultsBarGraph from './ResultsBarGraph';
import './resultPage.css';
import { PlayerScore } from '../../types';

interface Props {
  mySpeed: number;
  numberOfLetters: number;
  gameDuration: number;
  myRanking:number;
  accuracy:number;
}
const competitors: PlayerScore[] = [
  new PlayerScore('1', 50, 20),
  new PlayerScore('1', 30, 20),
  new PlayerScore('1', 40, 20),
  new PlayerScore('1', 10, 20)
];
const resultbarProps = competitors.map((playerScore: PlayerScore) => {
  return playerScore.score;
});
const normalizedCompetitors = normalizeNumbers(resultbarProps);
export default function ResultPage(props: Props) {
  return (
    <div id="result-page">
      <MyScoreSection
        speed={props.mySpeed}
        numberOfLetters={props.numberOfLetters}
        gameDuration={props.gameDuration}
        ranking={props.myRanking}
        accuracy={props.accuracy}
      />
      <div className="graph-bar-container">
        <ResultsBarGraph competitors={normalizedCompetitors} />
      </div>
    </div>
  );
}
// https://stackoverflow.com/questions/13368046/how-to-normalize-a-list-of-positive-numbers-in-javascript
function normalizeNumbers(numbers: number[]) {
  const ratio = Math.max(...numbers) / 100;
  numbers = numbers.map(v => Math.round(v / ratio));
  return numbers;
}
