import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import socketManager from '../socketManager';
import GameManagerContainer from '../components/game-manager/gameManagerContainer';
import ScoreBoardContainer from '../components/Scoreboard/ScoreBoardContainer';

class GamePage extends PureComponent {
  constructor(props:any) {
    super(props);
    socketManager.initSocket(props.dispatch);
  }
  render() {
    return (
      <div id="game-page">
        <ScoreBoardContainer />
        <GameManagerContainer />
      </div>
    );
  }
}

export default connect()(GamePage);
