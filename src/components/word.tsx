import * as React from "react";
import Letter, { ILetterProps } from "./letter";
export interface IWordProps {
letters: ILetterProps[];
}

class Word extends React.PureComponent<IWordProps, object> {
  public render() {
    return (
      <div>
        {this.props.letters.map((letter: ILetterProps, index: number) => {
          return <Letter {...letter} key={index} />;
        })}
      </div>
    );
  }
}

export default Word;
