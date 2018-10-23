import * as React from 'react';
import GameManagerContainer from '../components/game-manager/gameManagerContainer';
import ScoreBoardContainer from '../components/Scoreboard/ScoreBoardContainer';

export default function GamePage() {
  return (
    <div>
      <ScoreBoardContainer />
      <GameManagerContainer />
    </div>
  );
}
