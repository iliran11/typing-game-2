import React, { Fragment } from 'react';
import { ScoreSections } from 'src/components/ComponentsIndex';
import { TCCard } from 'src/components/ComponentsIndex';
import { CompareResults } from './CompareResults';
import { HighlightsI } from 'src/types/typesIndex';
import { HighlightsList } from 'src/pages/Profile/Tabs/Highlights/HighlightsList';

export interface Stats2TabProps {
  totalWins: number;
  totalGames: number;
  highlights: HighlightsI;
}

export interface Stats2TabState {}

export default class Stats2Tab extends React.Component<
  Stats2TabProps,
  Stats2TabState
> {
  constructor(props: Stats2TabProps) {
    super(props);

    this.state = {};
  }
  get winRatio() {
    return `${(this.props.totalWins / this.props.totalGames) * 100}%`;
  }
  renderWinRatio() {
    return (
      <TCCard title="Your win rate" className="profile-card">
        <div className="win-ratio-container position-relative">
          <div className="win-ratio-details  position-relative bottom-border">
            <ScoreSections
              data={[
                { value: this.props.totalWins, label: 'Won' },
                { value: this.props.totalGames, label: 'Games' }
              ]}
            />
          </div>
          <div className="win-rate text-center"> {this.winRatio} WIN RATE</div>
        </div>
      </TCCard>
    );
  }
  renderHighlightLists() {
    return (
      <TCCard title="Your Highlights" className="profile-card">
        <HighlightsList highlights={this.props.highlights} />
      </TCCard>
    );
  }
  public render() {
    if (this.props.totalGames === 0) {
      return <div>Empty State</div>;
    }
    return (
      <Fragment>
        {this.renderWinRatio()}
        <CompareResults wordsMin={40} charsMin={30} accuracy={0.4} />
        {this.renderHighlightLists()}
      </Fragment>
    );
  }
}
