import React from 'react';
import Avatar from '../../components/Scoreboard/Avatar';
import star from '../../assets/star.svg';
import checkedIcon from '../../assets/checked.svg';
export default function ResultsBarGraph(props: any) {
  return <div className="result-graph">{props.competitors.map(renderBar)}</div>;
}
function renderBar(competitor: any, index: number) {
  return (
    <div
      className="result-graph-bar gradient-7"
      style={{ height: `${competitor.normalizedWpm}%` }}
      key={index}
    >
      <div className="graph-ranking-info">
        <div className="graph-bar-avatar-container">
          <Avatar
            type={competitor.type}
            index={competitor.avatar}
            className="graph-bar-avatar"
          />
          {competitor.compeletedPercntage===1 && (
            <img className="completed-icon" src={checkedIcon} />
          )}
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
