import Button from '@material-ui/core/Button';
import 'src/css/components/tc-button.scss';

import * as React from 'react';

export interface TSButtonProps {
  children: any;
  onClick: any;
  rootClass?: string;
}

export function TCButton(props: TSButtonProps) {
  const classes = {
    root: `tc-button ${props.rootClass || ''}`
  };
  return (
    <Button
      variant="raised"
      classes={classes}
      onClick={props.onClick}
      {...props}
    >
      {props.children}
    </Button>
  );
}
