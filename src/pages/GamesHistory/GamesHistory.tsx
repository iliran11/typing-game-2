import React, { PureComponent } from 'react';
import GamesHistoryItem from 'src/pages/GamesHistory/GamesHistoryItem.tsx';
import { GameSummryDBI } from 'src/types/schemasTypes';
import 'src/css/pages/game-history.scss';

interface Props {
  isFetched: boolean;
  gameHistoryItems: GameSummryDBI[];
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
      this.props.navigateToReplay(roomId, this.props.history.push);
    };
  }
  renderRow(item: GameSummryDBI, index: number) {
    return (
      <div onClick={this.onItemClick(item.roomId)} key={item.roomId}>
        <GamesHistoryItem item={item} />
      </div>
    );
  }
  get gameHistoryItems() {
    // @ts-ignore
    return Object.values(this.props.gameHistoryItems);
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
        {this.gameHistoryItems.map(this.renderRow)}
      </div>
    );
  }
}

export default GamesHistory;
