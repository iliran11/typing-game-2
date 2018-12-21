import React, { PureComponent } from 'react';
import GamesHistoryItem from './GamesHistoryItem';

interface Props {
  name: string;
  enthusiasmLevel?: number;
}

class GamesHistory extends PureComponent<Props, {}> {
  render() {
    return <GamesHistoryItem />;
  }
}

export default GamesHistory;
