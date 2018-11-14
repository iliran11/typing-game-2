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
}

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
        <ResultsBarGraph competitors={props.competitors} />
      </div>
    </div>
  );
}
