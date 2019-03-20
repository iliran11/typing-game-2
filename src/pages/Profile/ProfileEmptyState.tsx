import * as React from 'react';
import Button from '@material-ui/core/Button';
import { iosShowKeyboard } from 'src/middlewares/IosShowKeyboard';
import { TCNavigator } from 'src/middlewares/TCNavigations';
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
        onClick={TCNavigator.getInstance().navigateToMultiplayer}
        fullWidth
      >
        Play
      </Button>
    </div>
  );
}
