import * as React from "react";
import CompetitorList from "./CompetitorList";

interface Props {
  myId: string;
  players: any;
}

class ScoreBoard extends React.PureComponent<Props, object> {
  public render() {
    return (
      <React.Fragment>
        <h4>My Name: {this.props.myId}</h4>
        <CompetitorList players={this.props.players} />
      </React.Fragment>
    );
  }
}

export default ScoreBoard;
