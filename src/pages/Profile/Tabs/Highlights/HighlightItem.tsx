import * as React from 'react';
import videoPlayer from 'src/assets/play/play.svg';
import { TCNavigator } from 'src/middlewares/TCNavigations';

export interface HighlightItemProps {
  firstRow: string;
  secondRow: string;
  thirdRow: string;
  createdDate: string;
  roomId: string;
  durationTime: string;
}

export function HighlightItem(props: HighlightItemProps) {
  const onClick = function() {
    TCNavigator.getInstance().navigateToReplay(props.roomId);
  };
  return (
    <section className="highlight-item" onClick={onClick}>
      <div className="highlight-image-container shadow-4dp">
        <img src={videoPlayer} />
        <span className="replay-duration">{props.durationTime}</span>
      </div>
      <div className="highlight-info">
        <h3>{props.firstRow}</h3>
        <p>{props.secondRow}</p>
        <p>{props.thirdRow}</p>
        <p className="highlight-creation-date">{props.createdDate}</p>
      </div>
    </section>
  );
}
