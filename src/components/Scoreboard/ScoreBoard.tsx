import * as React from 'react';
import CompetitorList from './CompetitorList';

interface Props {
  myId: string;
  players: any;
  roomId: number;
  roomSize:number;
  history: any;
}

class ScoreBoard extends React.PureComponent<Props, object> {
  render() {
    return (
      <CompetitorList
        players={this.props.players}
        roomSize={this.props.roomSize}
        myId={this.props.myId}
        history={this.props.history}
      />
    );
  }
}

export default ScoreBoard;
