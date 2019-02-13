import React, { Fragment } from 'react';

export interface WordProps {
  letters: string[];
  key: number;
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
        {this.props.letters.map((letter, index) => {
          return (
            <span className="letter" key={index}>
              {letter !== ' ' && letter}
              {letter === ' ' && <Fragment>&nbsp;</Fragment>}
            </span>
          );
        })}
      </span>
    );
  }
}
