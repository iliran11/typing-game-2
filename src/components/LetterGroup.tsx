import * as React from "react";
import LetterUi from "./letterUi";
interface Props {
  letters: string[];
}

interface State {}

export default class GameManager extends React.Component<Props, State> {
  render() {
    return (
      <React.Fragment>
        {this.props.letters.map((letter: string, index: number) => {
          return (
            <span key={index}>
              <LetterUi letter={letter} input={""} isSelected={false} />
            </span>
          );
        })}
      </React.Fragment>
    );
  }
}
