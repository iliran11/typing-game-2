import * as React from "react";
import cx from "classnames";

export interface ILetterProps {
  letter: string;
  isSelected: boolean;
  status: LetterStatus;
}

export enum LetterStatus {
  Correct,
  Wrong,
  Untyped
}

class Letter extends React.PureComponent<ILetterProps, object> {
  get cssClass() {
    const { isSelected, status } = this.props;
    return cx("letter", {
      selected: isSelected,
      correct: status === LetterStatus.Correct,
      wrong: status === LetterStatus.Wrong,
      untyped: status === LetterStatus.Untyped
    });
  }
  
  public render() {
    return <span className={this.cssClass}>{this.props.letter}</span>;
  }
}

export default Letter;
