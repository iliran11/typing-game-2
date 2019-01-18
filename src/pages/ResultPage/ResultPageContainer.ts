import { connect } from 'react-redux';
import ResultPage from './ResultPage';
import { PlayerGameStatus, RootState } from '../../types';
import { restartGame } from '../../store/gameAction';

const mapStateToProps = (state: RootState) => {
  const myId = state.serverStatus.myId;
  // @ts-ignore
  const playersScores: PlayerGameStatus[] = Object.values(
    state.serverStatus.playersGameStatus
  );
  const myPlayerData: PlayerGameStatus =
    state.serverStatus.playersGameStatus[myId];
  // @ts-ignore
  let rankings: PlayerGameStatus[] = playersScores;
  rankings = rankings.sort(sortPlayersRanking);
  const myRanking = rankings.findIndex((player: PlayerGameStatus) => {
    return player.id === myId;
  });

  const normalizedWpm = normalizeNumbers(
    playersScores.map((player: PlayerGameStatus) => {
      return player.score;
    })
  );
  const graphData: any = playersScores.map(
    (player: PlayerGameStatus, index: number) => {
      const ranking: number = rankings.findIndex(
        (currentPlayer: PlayerGameStatus) => {
          return currentPlayer.id === player.id;
        }
      );
      return { ...player, normalizedWpm: normalizedWpm[index], ranking };
    }
  );
  const mySpeed = Math.round(myPlayerData.score);
  const numberOfLetters = state.gameData.letters.length;
  const gameDuration = myPlayerData.gameDuration;

  return {
    mySpeed,
    numberOfLetters,
    gameDuration,
    myRanking,
    accuracy: myPlayerData.accuracy,
    competitors: graphData,
    players: state.serverStatus.playersGameStatus
  };
};

const mapDispatchToProps = {
  restartGame
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultPage);

export function sortPlayersRanking(a: PlayerGameStatus, b: PlayerGameStatus) {
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
  // @ts-ignore
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
