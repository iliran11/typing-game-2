import * as React from 'react';
import { ScoreSectionsData } from '../../types/typesIndex';
import 'src/css/components/score-sections.scss';

export interface ScoreSections {
  data: ScoreSectionsData[];
}
interface ScoreDivisionProps {
  data: ScoreSectionsData;
  hasBorder: boolean;
}

export function ScoreSections(props: ScoreSections) {
  return (
    <div className="score-sections">
      {props.data.map((data, index) => {
        const hasBorder = index !== props.data.length - 1;
        return <ScoreDivision key={index} data={data} hasBorder={hasBorder} />;
      })}
    </div>
  );
}

function ScoreDivision(props: ScoreDivisionProps) {
  return (
    <div className={`score-division ${props.hasBorder ? 'right-border' : ''}`}>
      <span className="score">{props.data.value}</span>
      <span className="label">{props.data.label}</span>
    </div>
  );
}
