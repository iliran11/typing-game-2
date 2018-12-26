import React, { PureComponent } from 'react';
import CompetitorList from '../../components/Scoreboard/CompetitorList';

class ReplayPage extends PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    props.fetchReplay(props.roomId);
  }
  render() {
    if (this.props.replay) {
      this.props.replay.forEach((item: any) => {
        console.log(item.created,item.gameTickSequenceId,item.results[0].completedPercentage);
      });
      // console.log(this.props.replay);
      return (
        <div id="game-page">
          <CompetitorList
            players={this.props.replay[0].results}
            avatars={this.props.avatars}
            roomSize={4}
            myId={this.props.myId}
            history={this.props.history}
          />
        </div>
      );
    }
    return <div>wait for it</div>;
  }
}

export default ReplayPage;
