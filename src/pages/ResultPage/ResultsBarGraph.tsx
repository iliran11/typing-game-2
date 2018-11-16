import React from 'react';
import Avatar from '../../components/Scoreboard/Avatar';
import { PlayerType, ResultGraphData } from '../../types';
import star from '../../assets/star.svg';

interface Props {
  competitors: ResultGraphData[];
}
export default function ResultsBarGraph(props: Props) {
  return <div className="result-graph">{props.competitors.map(renderBar)}</div>;
}
function renderBar(competitor: ResultGraphData, index: number) {
  return (
    <div
      className="result-graph-bar gradient-7"
      style={{ height: `${competitor.normalizedWpm}%` }}
      key={index}
    >
      <div className="graph-ranking-info">
        <div className="graph-bar-avatar-container">
          <Avatar
            type={PlayerType.human}
            index={1}
            className="graph-bar-avatar"
          />
          <div className="star-container">
            <img src={star} className="star" />
            <span className="ranking-number">{competitor.ranking + 1}</span>
          </div>
        </div>
        {/* this fixed a bug with -webkit-box-orient being ommited in css for some reason. */}
        {/* 
  // @ts-ignore */}
        <span
          className="graph-bar-name"
          style={{ WebkitBoxOrient: 'vertical' }}
        >
          {competitor.id}
        </span>
      </div>
      <div className="graph-wpm-info">
        <div className="graph-wpm-info-number shadow-6dp">
          {/* 
  // @ts-ignore */}
          <span>{Math.round(competitor.score)}</span>
          <span>WPM</span>
        </div>
      </div>
    </div>
  );
}
