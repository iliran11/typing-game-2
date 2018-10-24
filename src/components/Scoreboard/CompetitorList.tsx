import * as React from 'react';
import Competitor from './Competitor';
import { PlayerClient } from './../../types';

interface Props {
  players: PlayerClient[];
}

class CompetitorList extends React.PureComponent<Props, object> {
  render() {
    if (Array.isArray(this.props.players)) {
      return (
        <div className="competitor-list">
          {this.props.players.map((player: PlayerClient, index: number) => {
            return (
              <Competitor
                name={player.name}
                score={player.score}
                compeletedPercntage={player.compeletedPercntage}
                key={index}
              />
            );
          })}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default CompetitorList;
