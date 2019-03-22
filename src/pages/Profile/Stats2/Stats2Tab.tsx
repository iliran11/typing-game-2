import React, { Fragment } from 'react';
import { TypingTestScoreboard } from 'src/components/ComponentsIndex';
import { TCCard } from 'src/components/ComponentsIndex';

export interface Stats2TabProps {}

export interface Stats2TabState {}

export default class Stats2Tab extends React.Component<
  Stats2TabProps,
  Stats2TabState
> {
  constructor(props: Stats2TabProps) {
    super(props);

    this.state = {};
  }
  renderWinRatio() {
    return (
      <TCCard title="Your win rate" className="profile-card">
        <div className="win-ratio-container position-relative">
          <div className="win-ratio-details  position-relative bottom-border">
            <TypingTestScoreboard
              data={[
                { value: 50, label: 'Won' },
                { value: 302, label: 'Games' }
              ]}
            />
          </div>
          <div className="win-rate text-center"> 53% WIN RATE</div>
        </div>
      </TCCard>
    );
  }
  public render() {
    return this.renderWinRatio();
  }
}
