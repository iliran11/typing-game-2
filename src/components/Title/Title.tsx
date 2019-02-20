import * as React from 'react';

export interface TitleProps {
  children?: any;
  className?: string;
}

export function Title(props: TitleProps) {
  return (
    <div className={`stats-section-header ${props.className || ''}`}>
      <h3>{props.children}</h3>
    </div>
  );
}
