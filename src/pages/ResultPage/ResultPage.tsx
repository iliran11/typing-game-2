import React from 'react';
import MyScoreSection from './MyScoreSection';
import ResultsBarGraph from './ResultsBarGraph';
import {ResultGraphData} from '../../types'
import './resultPage.css';

interface Props {
  mySpeed: number;
  numberOfLetters: number;
  gameDuration: number;
  myRanking:number;
  accuracy:number;
  competitors:ResultGraphData[];
  history:any;
  restartGame: (history:any)=>void
}

export default function ResultPage(props: Props) {
  const competeAgain = () => {
    props.restartGame(props.history)
  }
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
        <ResultsBarGraph competitors={props.competitors} />
      </div>
      <div id="result-page-buttons">
      <button id="compete-again" className="gradient-5 shadow-3dp button-large" onClick={competeAgain}>Compete Again</button>
      </div>
    </div>
  );
}
