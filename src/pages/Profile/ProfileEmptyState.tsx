import * as React from 'react';
import typing from '../../assets/typing.svg';
import Button from '@material-ui/core/Button';

export interface ProfileEmptyStateProps {
  navigateToGame: any;
}

export function ProfileEmptyState(props: ProfileEmptyStateProps) {
  return (
    <div id="profile-empty-page">
      <img src={typing} />
      <h2>We need to See How You Perform</h2>
      <h3>Play a game!</h3>
      <Button
        variant="contained"
        color="primary"
        onClick={props.navigateToGame}
      >
        Play
      </Button>
    </div>
  );
}
