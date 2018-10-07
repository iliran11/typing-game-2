import * as React from "react";
import cx from "classnames";
import WhiteSpace from "./game-manager/whitespace";
import ToolTip from "./game-manager/tooltip";

export interface LetterUiProps {
  letter: string;
  isSelected: boolean;
  input: string;
}
interface State {
  isMounted: boolean;
}
export enum LetterStatus {
  Correct,
  Wrong,
  Untyped
}

class Letter extends React.PureComponent<LetterUiProps, State> {
  letterRef: any;
  constructor(props: any) {
    super(props);
    this.letterRef = React.createRef();
    this.state = {
      isMounted: false
    };
  }
  get isMounted() {
    return this.state.isMounted;
  }
  get tooltipDimensions() {
    if (this.isMounted) {
      const letterData = this.letterRef.current.getBoundingClientRect();
      return {
        x: letterData.left,
        y: letterData.top
      };
    }
    return { x: 0, y: 0 };
  }
  componentDidMount() {
    this.setState({
      isMounted: true
    });
  }
  get cssClass() {
    const { isSelected } = this.props;
    return cx("letter", {
      selected: isSelected
    });
  }

  public render() {
    if (this.props.letter === " ") {
      return (
        <div className="letter">
          <WhiteSpace />
        </div>
      );
    }
    this.tooltipDimensions;
    return (
      <div className="letter">
        <ToolTip
          x={this.tooltipDimensions.x}
          y={this.tooltipDimensions.y}
          open = {this.props.isSelected}
          input = {this.props.input}
        />
        <span className={this.cssClass} ref={this.letterRef}>
          {this.props.letter}
        </span>
      </div>
    );
  }
}

export default Letter;
