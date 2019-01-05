import * as React from 'react';
import videoPlayer from '../../../../assets/play.svg';

export interface HighlightItemProps {
  firstRow: string;
  secondRow: string;
  thirdRow: string;
  createdDate: string;
}

export function HighlightItem(props: HighlightItemProps) {
  return (
    <section className="highlight-item">
      <div className="highlight-image-container shadow-4dp">
        <img src={videoPlayer} />
      </div>
      <div className="highlight-info">
        <h3>{props.firstRow}</h3>
        <p>{props.secondRow}</p>
        <p>{props.thirdRow}</p>
        <p>{props.createdDate}</p>
      </div>
    </section>
  );
}
