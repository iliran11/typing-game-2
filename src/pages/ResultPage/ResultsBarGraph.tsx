import React from 'react';

export default function ResultsBarGraph(props: any) {
  return <div className="result-graph">{props.competitors.map(renderBar)}</div>;
}

function renderBar(competitor: any, index: number) {
  return (
    <div
      className="result-graph-bar gradient-7"
      style={{ height: `${competitor}%` }}
      key={index}
    />
  );
}
