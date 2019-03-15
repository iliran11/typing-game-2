import { BasePlayer } from '../Player/players-index';
import { PlayerType } from '../../../../types';

export class RoomPlayersManager {
  public playersMap: Map<string, BasePlayer> = new Map();
  constructor() {}
  addPlayer(player: BasePlayer) {
    this.playersMap.set(player.playerId, player);
  }
  removePlayer(player: BasePlayer) {
    this.playersMap.delete(player.playerId);
  }
  get playersArray() {
    const playersArray: (BasePlayer)[] = [];
    this.playersMap.forEach(player => {
      playersArray.push(player);
    });
    return playersArray;
  }
  playersArrayByType(playerType: PlayerType) {
    return this.playersArray.filter(player => {
      return player.playerType === playerType;
    });
  }
  get sortedPlayersArray() {
    const playersArray = [...this.playersArray];
    const sortedPlayersArray = playersArray.sort((a, b) => {
      if (a.playerGame.getWpmScore() > b.playerGame.getWpmScore()) {
        return -1;
      } else {
        return 1;
      }
    });
    return sortedPlayersArray;
  }
  playerRank(player: BasePlayer) {
    const rank = this.sortedPlayersArray.findIndex(currentPlayer => {
      return player.playerId === currentPlayer.playerId;
    });
    return rank + 1;
  }
}
