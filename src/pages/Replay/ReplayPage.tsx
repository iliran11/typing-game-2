import React, { PureComponent } from 'react';
import CompetitorList from '../../components/Scoreboard/CompetitorList';

class ReplayPage extends PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    props.fetchReplay(props.roomId);
  }
  render() {
    if (this.props.replay) {
      return (
        <CompetitorList
          players={this.props.replay[0].results}
          avatars={this.props.avatars}
          roomSize={4}
          myId={this.props.myId}
          history={this.props.history}
        />
      );
    }
    return <div>wait for it</div>;
  }
}

export default ReplayPage;
