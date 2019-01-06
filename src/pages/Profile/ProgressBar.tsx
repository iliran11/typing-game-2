import * as React from 'react';

export interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar(props: ProgressBarProps) {
  return (
    <section id="progress-bar-section">
      <span>Your progress bar</span>
      <div id="progress-bar">
        <div
          id="completed-area"
          style={{ width: `${props.progress * 100}%` }}
        />
      </div>
      <div />
    </section>
  );
}
