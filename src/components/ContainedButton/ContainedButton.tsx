import * as React from 'react';
import Button from '@material-ui/core/Button';

export interface ContainedButtonProps {
  children: any;
  fullWidth: boolean;
}

export function ContainedButton(props: ContainedButtonProps) {
  return (
    <Button variant="contained" {...props}>
      {props.children}
    </Button>
  );
}
