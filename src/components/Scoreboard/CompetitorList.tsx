import * as React from 'react';
import Competitor from './competitorContainer';
import { PlayerGameStatus, PlayerAvatar } from '../../types';
import { EMPTY_COMPETITOR_SLOT } from '../../constants';

interface Props {
  players: PlayerGameStatus[];
  roomSize: number;
  myId: string;
  history: any;
  avatars?: PlayerAvatar[];
}

class CompetitorList extends React.PureComponent<Props, object> {
  constructor(props: any) {
    super(props);
    this.renderCompetitor = this.renderCompetitor.bind(this);
    this.navigateToResult = this.navigateToResult.bind(this);
  }
  /**
   * we don't want to render just the number of players CURRENTLY being connect to the room.
   * we want to render from the start to render all the slots and show the status of the slot (filled/not filled)
   * so create an array just to iterate over it.
   * the roomSize will not change in runtime.
   */
  get emptySlotsArray(): void[] {
    return new Array(this.props.roomSize).fill(null);
  }
  getCompetitorProps(index: number): any {
    const { players } = this.props;
    const player = index < players.length ? players[index] : null;
    if (player) {
      const {
        score,
        completedPercentage,
        type,
        hasLeft,
        isFinished,
        id
      } = player;
      return {
        id,
        score,
        completedPercentage,
        type,
        isMe: id === this.props.myId,
        hasLeft,
        isFinished,
        playerAvatar: this.props.avatars && this.props.avatars[index]
      };
    } else {
      return {
        id: EMPTY_COMPETITOR_SLOT,
        score: '',
        compeletedPercntage: 0
      };
    }
  }
  renderCompetitor(value: void, index: number): JSX.Element {
    const competitorProps = this.getCompetitorProps(index);
    return (
      <Competitor
        {...competitorProps}
        index={index}
        key={index}
        navigateToResult={this.navigateToResult}
      />
    );
  }
  navigateToResult() {
    this.props.history.push('result');
  }
  render() {
    if (Array.isArray(this.props.players)) {
      return (
        <div id="competitor-list">
          {this.emptySlotsArray.map(this.renderCompetitor)}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default CompetitorList;
