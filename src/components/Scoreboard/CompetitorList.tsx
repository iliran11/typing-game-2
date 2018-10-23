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
        <React.Fragment>
          {this.props.players.map((player: PlayerClient, index: number) => {
            return (
              <div key={index}>
                <Competitor name={player.name} score={player.score}  compeletedPercntage={player.compeletedPercntage}/>
              </div>
            );
          })}
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}

export default CompetitorList;
