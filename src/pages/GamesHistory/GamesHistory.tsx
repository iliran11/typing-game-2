import React, { PureComponent } from 'react';
import GamesHistoryItem from './GamesHistoryItem';
import { GameModelInterface } from '../../types';
import '../../css/game-history.scss';

interface Props {
  isFetched: boolean;
  gameHistoryItems: GameModelInterface[];
  fetchGamesHistory: () => void;
}

class GamesHistory extends PureComponent<Props, {}> {
  constructor(props: any) {
    super(props);
    this.props.fetchGamesHistory();
  }
  renderRow(item: GameModelInterface) {
    return <GamesHistoryItem item={item} key={item._id} />;
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
