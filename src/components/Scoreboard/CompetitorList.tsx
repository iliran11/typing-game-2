import * as React from 'react';
import Competitor from './Competitor';
import { PlayerClient } from './../../types';
import {EMPTY_COMPETITOR_SLOT} from '../../constants'

interface Props {
  players: PlayerClient[];
  roomSize: number;
}

class CompetitorList extends React.PureComponent<Props, object> {
  constructor(props: any) {
    super(props);
    this.renderCompetitor = this.renderCompetitor.bind(this);
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
      const { name, score, compeletedPercntage } = player;
      return {
        name,
        score,
        compeletedPercntage
      };
    } else {
      return {
        name: EMPTY_COMPETITOR_SLOT,
        score: '',
        compeletedPercntage: 0
      };
    }
  }
  renderCompetitor(value: void, index: number): JSX.Element {
    const competitorProps = this.getCompetitorProps(index);
    return <Competitor {...competitorProps} index={index} key={index} />;
  }

  render() {
    if (Array.isArray(this.props.players)) {
      return (
        <div className="competitor-list">
          {this.emptySlotsArray.map(this.renderCompetitor)}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default CompetitorList;
