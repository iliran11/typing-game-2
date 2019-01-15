import * as React from 'react';
import typing from '../../assets/typing.svg';
import Button from '@material-ui/core/Button';

export interface ProfileEmptyStateProps {
  navigateToGame: any;
}

export function ProfileEmptyState(props: ProfileEmptyStateProps) {
  return (
    <div id="profile-empty-page">
      <p>
        Start improving your typing skill, in 5 minutes a day you will see
        improvement,you will be able to do more with less effort
      </p>
      <Button
        variant="contained"
        color="primary"
        onClick={props.navigateToGame}
        fullWidth
      >
        Play
      </Button>
    </div>
  );
}
