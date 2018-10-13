import * as React from "react";
import Competitor from "./Competitor";

interface Props {
  players: any;
}

class CompetitorList extends React.PureComponent<Props, object> {
  public render() {
    if (Array.isArray(this.props.players)) {
      return (
        <React.Fragment>
          {this.props.players.map((player: any, index: number) => {
            return (
              <div key={index}>
                <Competitor name={player.name} />
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
