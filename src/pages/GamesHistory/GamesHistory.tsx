import React, { PureComponent } from 'react';
import GamesHistoryItem from './GamesHistoryItem';

interface Props {
  name: string;
  enthusiasmLevel?: number;
}

class GamesHistory extends PureComponent<any, {}> {
  constructor(props: any) {
    super(props);
    this.props.fetchGamesHistory();
  }
  render() {
    if (this.props.isFecthed===false) {
      return <div>Loading .......</div>;
    }
    if (this.props.gameHistoryItems.length === 0) {
      return <div>START PLAYING AND HAVE HISOTRY</div>;
    }
    return <GamesHistoryItem />;
  }
}

export default GamesHistory;
