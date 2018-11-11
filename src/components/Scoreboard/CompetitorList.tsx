import * as React from 'react';
import Competitor from './Competitor';
import { PlayerClient } from '../../types';
import { MAX_PLAYERS_PER_ROOM, EMPTY_COMPETITOR_SLOT } from '../../constants';
import random from 'lodash.random';

interface Props {
  players: PlayerClient[];
  roomSize: number;
  myId: string;
  history: any;
}

class CompetitorList extends React.PureComponent<Props, object> {
  gradients: number[];
  constructor(props: any) {
    super(props);
    this.renderCompetitor = this.renderCompetitor.bind(this);
    this.gradients = this.buildGradients;
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
  get buildGradients() {
    const gradients: number[] = [];
    while (gradients.length < MAX_PLAYERS_PER_ROOM) {
      const randomNumber = random(1, MAX_PLAYERS_PER_ROOM);
      if (gradients.indexOf(randomNumber) > -1) {
        continue;
      }
      gradients.push(randomNumber);
    }
    return gradients;
  }
  getCompetitorProps(index: number): any {
    const { players } = this.props;
    const player = index < players.length ? players[index] : null;
    if (player) {
      const {
        score,
        compeletedPercntage,
        type,
        hasLeft,
        isFinished,
        id
      } = player;
      return {
        id,
        score,
        compeletedPercntage,
        type,
        isMe: id === this.props.myId,
        hasLeft,
        isFinished
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
        randomAvatarIndex={this.gradients[index]}
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
        <div id="competitor-list" className="shadow-2dp">
          {this.emptySlotsArray.map(this.renderCompetitor)}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default CompetitorList;
