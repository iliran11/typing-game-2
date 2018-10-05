import * as React from "react";
import Letter, { LetterUiProps } from "./letterUi";
export interface IWordProps {
letters: LetterUiProps[];
}

class Word extends React.PureComponent<IWordProps, object> {
  public render() {
    return (
      <div>
        {this.props.letters.map((letter: LetterUiProps, index: number) => {
          return <Letter {...letter} key={index} />;
        })}
      </div>
    );
  }
}

export default Word;
