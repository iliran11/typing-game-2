import * as React from 'react';
import { CompetitorContainer } from './competitorContainer';
import { PlayerAvatar } from '../../types';
import { PlayerGameStatus } from '../../types/GameStatusType';
import { EMPTY_COMPETITOR_SLOT } from '../../constants';

interface Props {
  players: PlayerGameStatus[];
  roomSize: number;
  myId: string;
  history: any;
  avatars?: PlayerAvatar[];
}

export class CompetitorList extends React.PureComponent<Props, object> {
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
        wpm,
        completedPercentage,
        type,
        hasLeft,
        hasFinished,
        playerId
      } = player;
      return {
        playerId,
        wpm,
        completedPercentage,
        type,
        isMe: playerId === this.props.myId,
        hasLeft,
        hasFinished,
        playerAvatar: this.props.avatars && this.props.avatars[index],
        name: player.name ? player.name : this.props.myId
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
      <CompetitorContainer
        {...competitorProps}
        index={index}
        key={index}
        navigateToResult={this.navigateToResult}
      />
    );
  }
  navigateToResult() {
    // this.props.history.push('result');
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
