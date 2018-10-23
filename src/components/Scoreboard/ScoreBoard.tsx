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
      <React.Fragment>
        <h4>My Name: {this.props.myId}</h4>
        <h5>Room Number: {this.props.roomId}</h5>
        <CompetitorList players={this.props.players} />
      </React.Fragment>
    );
  }
}

export default ScoreBoard;
