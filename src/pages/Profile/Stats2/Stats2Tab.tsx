import React, { Fragment } from 'react';
import { ScoreSections } from 'src/components/ComponentsIndex';
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
  renderWinRate() {
    return (
      <TCCard title="Your best scores" className="profile-card">
        <ScoreSections
          data={[
            { value: 34, label: 'WORDS/MIN' },
            { value: 64, label: 'CHARS' },
            { value: '94%', label: 'ACCURACY' }
          ]}
        />
      </TCCard>
    );
  }
  renderWinRatio() {
    return (
      <TCCard title="Your win rate" className="profile-card">
        <div className="win-ratio-container position-relative">
          <div className="win-ratio-details  position-relative bottom-border">
            <ScoreSections
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
    return (
      <Fragment>
        {this.renderWinRatio()}
        {this.renderWinRate()}
      </Fragment>
    );
  }
}
