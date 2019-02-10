import * as React from 'react';

export interface WordProps {
  letters: string[];
}

export interface WordState {}

export class Word extends React.Component<WordProps, WordState> {
  constructor(props: WordProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <span className="word">
        {this.props.letters.map(letter => {
          return <span className="letter">{letter}</span>;
        })}
      </span>
    );
  }
}
