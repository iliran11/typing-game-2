import * as React from 'react';
import GameView from './GameView';

export interface IAppProps {
  words: string[];
}

export interface IAppState {}

export default class IApp extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <div>
        <GameView letters={this.props.words} />
      </div>
    );
  }
}
