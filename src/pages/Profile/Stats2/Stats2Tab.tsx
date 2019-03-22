import React, { Fragment } from 'react';
import { ScoreSections } from 'src/components/ComponentsIndex';
import { TCCard } from 'src/components/ComponentsIndex';
import { CompareResults } from './CompareResults';
import { ReplayContainer } from 'src/pages/pagesIndex';

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
        <CompareResults wordsMin={40} charsMin={30} accuracy={0.4} />
      </Fragment>
    );
  }
}
