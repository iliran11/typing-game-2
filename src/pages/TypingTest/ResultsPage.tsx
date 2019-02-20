import React from 'react';
import { Title } from '../../components/Title/Title';
import { TypingTestScoreboardContainer } from './TypingTestScoreboardContainer';
import Button from '@material-ui/core/Button';

export interface TypingTestResultPageProps {
  comparison: number;
  roomId: string;
}

export function TypingTestResultPage(props: TypingTestResultPageProps) {
  return (
    <div id="results-page" className="overflow-auto-y display-flex flex-column">
      <div id="results-title" className="display-flex">
        <Title>Test Results</Title>
      </div>
      <div id="scoreboard-results">
        <TypingTestScoreboardContainer roomId={props.roomId} />
      </div>
      <Title />
      <h2 className="result-page-padding">Your score beats 77.37% of all</h2>
      <Title className="align-right" />
      <section
        id="results-page-footer"
        className="result-page-padding flex-center flex-column"
      >
        <p>
          In registration, you will be able to preserve the results of the tests
          and the results of the game.
        </p>
        <FooterButton rootClass="facebook-background color-white">
          <span>
            Sign up with <span className="bold">Facebook</span>
          </span>
        </FooterButton>
        <p>Check your skills in front of people in real time</p>
        <FooterButton rootClass="color-1 multiplayer-button">
          Multiplayer
        </FooterButton>
      </section>
    </div>
  );
}

interface FooterButtonProps {
  children: any;
  rootClass?: string;
}
function FooterButton(props: FooterButtonProps) {
  const buttonClasses = {
    root: `footer-button ${props.rootClass || ''}`
  };
  return (
    <Button variant="contained" fullWidth classes={buttonClasses}>
      {props.children}
    </Button>
  );
}
