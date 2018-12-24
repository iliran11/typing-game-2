import React, { PureComponent } from 'react';
import GamesHistoryItem from './GamesHistoryItem';
import { GameModelInterface } from '../../types';
import { ROOM_ID_PARM } from '../../constants';
import axios from 'axios';
import '../../css/game-history.scss';

interface Props {
  isFetched: boolean;
  gameHistoryItems: GameModelInterface[];
  fetchGamesHistory: () => void;
}

class GamesHistory extends PureComponent<any, {}> {
  constructor(props: any) {
    super(props);
    this.props.fetchGamesHistory();
    this.renderRow = this.renderRow.bind(this);
  }
  onItemClick(roomId: string) {
    return () => {
      this.props.navigateToReplay(roomId);
    };
  }
  renderRow(item: GameModelInterface, index: number) {
    return (
      <div onClick={this.onItemClick(item._id)} key={item._id}>
        <GamesHistoryItem item={item} />
      </div>
    );
  }
  render() {
    if (this.props.isFetched === false) {
      //TODO: add here nice loader
      return <div>Loading .......</div>;
    }
    if (this.props.gameHistoryItems.length === 0) {
      // TODO: add here empty state.
      return <div>START PLAYING AND HAVE HISOTRY</div>;
    }
    return (
      <div id="game-history-page">
        {this.props.gameHistoryItems.map(this.renderRow)}
      </div>
    );
  }
}

export default GamesHistory;
