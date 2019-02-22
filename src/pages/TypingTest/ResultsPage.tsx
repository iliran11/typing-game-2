import React, { Fragment } from 'react';
import { Title } from '../../components/Title/Title';
import { TypingGameInfoI } from '../../types/typesIndex';
import { TypingTestScoreboard } from '../../components/TypingTestScoreBoard/TypingTestScoreboard';
import { getTypingTestScoreboardData } from '../../utilities';
import Button from '@material-ui/core/Button';

export interface TypingTestResultPageProps {
  roomId: string;
  data: TypingGameInfoI;
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
