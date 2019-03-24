import React, { Fragment } from 'react';
import { ScoreSections } from 'src/components/ComponentsIndex';
import { TCCard } from 'src/components/ComponentsIndex';
import { CompareResults } from './CompareResults';
import { HighlightsI, DeviceType } from 'src/types/typesIndex';
import { HighlightsList } from 'src/pages/Profile/Tabs/Highlights/HighlightsList';
import { GameType, ProfileBestGame } from 'src/types/typesIndex';
import searching from 'src/assets/searching/searching.svg';

export interface Stats2TabProps {
  totalWins: number;
  totalGames: number;
  highlights: HighlightsI;
  bestGame: ProfileBestGame;
  platform: DeviceType;
  gameType: GameType;
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
  renderBestGame() {
    const { platform, gameType, bestGame } = this.props;
    const playerGameStatus = bestGame[gameType][platform];
    if (playerGameStatus) {
      return (
        <CompareResults
          wordsMin={playerGameStatus.wpm}
          charsMin={playerGameStatus.cpm}
          accuracy={playerGameStatus.accuracy}
          deviceType={this.props.platform}
        />
      );
    } else {
      // if there is no best game - nothing will be rendered anyway.
      return null;
    }
  }
  public render() {
    if (this.props.totalGames === 0) {
      return (
        <div className="profile-empty-tab">
          <img src={searching} />
          <span className="empty-state-paragraph">
            No Data to show in{' '}
            <span className="upper-case">
              {this.props.gameType}/{this.props.platform}
            </span>
          </span>
        </div>
      );
    }
    return (
      <Fragment>
        {this.renderWinRatio()}
        {this.renderBestGame()}
        {this.renderHighlightLists()}
      </Fragment>
    );
  }
}
