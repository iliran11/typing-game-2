import * as React from 'react';
import CompetitorList from './CompetitorList';

interface Props {
  myId: string;
  players: any;
  roomId:number;
}

class ScoreBoard extends React.PureComponent<Props, object> {
  render() {
    return (
        <CompetitorList players={this.props.players} />
    );
  }
}

export default ScoreBoard;
