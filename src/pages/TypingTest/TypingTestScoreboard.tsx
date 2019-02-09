import * as React from 'react';
import { ScoreboardSectionData } from '../../types/typesIndex';

export interface TypingTestScoreboardProps {
  data: ScoreboardSectionData[];
}
interface ScoreDivisionProps {
  data: ScoreboardSectionData;
  hasBorder: boolean;
}

export function TypingTestScoreboard(props: TypingTestScoreboardProps) {
  return (
    <div id="typing-test-scoreboard">
      {props.data.map((data, index) => {
        const hasBorder = index !== props.data.length - 1;
        return <ScoreDivision data={data} hasBorder={hasBorder} />;
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
