import * as React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

export interface SimpleSnackbarWrapperProps {
  open: boolean;
  onClose: () => void;
  classes: object;
  message: string;
}

export function SimpleSnackbarWrapper(props: SimpleSnackbarWrapperProps) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      open={props.open}
      autoHideDuration={2000}
      onClose={props.onClose}
    >
      <SnackbarContent message={props.message} classes={props.classes} />
    </Snackbar>
  );
}
