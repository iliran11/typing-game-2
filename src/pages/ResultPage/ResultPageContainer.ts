import { connect } from 'react-redux';
import ResultPage from './ResultPage';
import { PlayerClient, ResultGraphData } from '../../types';
import {restartGame} from '../../store/gameAction'

const mapStateToProps = (state: any) => {
  const myId = state.serverStatus.myId;
  const myPlayerData: PlayerClient = state.serverStatus.players.find(
    (player: PlayerClient) => {
      return player.id === myId;
    }
  );
  let rankings: PlayerClient[] = [...state.serverStatus.players];
  rankings = rankings.sort(
    sortPlayersRanking
  );
  const myRanking = rankings.findIndex((player: PlayerClient) => {
    return player.id === myId;
  });

  const normalizedWpm = normalizeNumbers(
    state.serverStatus.players.map((player: PlayerClient) => {
      return player.score;
    })
  );
  const graphData: ResultGraphData[] = state.serverStatus.players.map(
    (player: PlayerClient, index: number) => {
      const ranking: number = rankings.findIndex(
        (currentPlayer: PlayerClient) => {
          return currentPlayer.id === player.id;
        }
      );
      return { ...player, normalizedWpm: normalizedWpm[index], ranking };
    }
  );
  return {
    mySpeed: Math.round(myPlayerData.score),
    numberOfLetters: state.gameData.letters.length,
    gameDuration: myPlayerData.gameDuration,
    myRanking,
    accuracy: myPlayerData.accuracy,
    competitors: graphData
  };
};

const mapDispatchToProps = {
  restartGame
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultPage);

export function sortPlayersRanking(a: PlayerClient, b: PlayerClient) {
  if (a.gameDuration && !b.gameDuration) {
    // a wins
    return -1;
  }
  if (!a.gameDuration && b.gameDuration) {
    // b wins
    return 1;
  }
  if (!a.gameDuration && !b.gameDuration) {
    // they are both undefined. we don't care about the order.
    return 0;
  }
  if (a.gameDuration < b.gameDuration) {
    // a finished faster - he wins
    return -1;
  } else {
    return 1;
  }
}

// https://stackoverflow.com/questions/13368046/how-to-normalize-a-list-of-positive-numbers-in-javascript
function normalizeNumbers(numbers: number[]) {
  const ratio = Math.max(...numbers) / 100;
  numbers = numbers.map(v => Math.round(v / ratio));
  return numbers;
}
