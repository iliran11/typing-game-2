import React from 'react';
import 'src/css/components/ts-card.scss';
import cx from 'classnames';
export interface TCCardProps {
  children: any;
  title: string;
  className?: string;
}

export function TCCard(props: TCCardProps) {
  return (
    <div className={cx('tc-card', props.className)}>
      <h5 className="bottom-border ">{props.title}</h5>
      <div className="content gradient-6 shadow-4dp">{props.children}</div>
    </div>
  );
}
