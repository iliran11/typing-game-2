import React, { Fragment } from 'react';
import { Title } from 'src/components/Title/Title';
import { PlayerGameStatus } from 'src/types/typesIndex';
import { TypingTestScoreboard } from 'src/components/TypingTestScoreBoard/TypingTestScoreboard';
import { getTypingTestScoreboardData } from 'src/utilities';
import 'src/css/pages/results-page.scss'

export interface TypingTestResultPageProps {
  roomId: string;
  data: PlayerGameStatus;
}

export function TypingTestResultPage(props: TypingTestResultPageProps) {
  const data = getTypingTestScoreboardData(props.data);
  return (
    <Fragment>
      <div id="results-title" className="display-flex">
        <Title>Test Results</Title>
      </div>
      <div id="scoreboard-results">
        <TypingTestScoreboard data={data} />
      </div>
      <Title />
      <h2 className="result-page-padding">Your score beats 77.37% of all</h2>
      <Title className="align-right" />
    </Fragment>
  );
}
