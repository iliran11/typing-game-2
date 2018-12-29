import * as React from 'react';

export interface ProgressBarProps {
  progressToNextLevel: number;
}

export function ProgressBar(props: ProgressBarProps) {
  return (
    <section id="progress-bar-section">
      <span>Your progress bar</span>
      <div id="progress-bar">
        <div id="completed-area" />
      </div>
      <div />
    </section>
  );
}
