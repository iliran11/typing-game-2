import * as React from "react";
import cx from "classnames";
import WhiteSpace from "./game-manager/whitespace";
import ToolTip from "./game-manager/tooltip";

export interface LetterUiProps {
  letter: string;
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
  private letterRef: any;
  private isSelected: boolean = false;
  private input: string = ""
  private constructor(props: any) {
    super(props);
    this.letterRef = React.createRef();
    this.state = {
      isMounted: false
    };
  }
  private get isMounted() {
    return this.state.isMounted;
  }
  private get tooltipDimensions() {
    if (this.isMounted) {
      const letterData = this.letterRef.current.getBoundingClientRect();
      return {
        x: letterData.left,
        y: letterData.top
      };
    }
    return { x: 0, y: 0 };
  }
  public componentDidMount() {
    this.setState({
      isMounted: true
    });
  }
  private get letterClassNames() {
    return cx("letter animated", {
      success: this.input === this.props.letter,
      "is-selected": this.isSelected
    });
  }
  private get letterDisplay() {
    return this.props.letter.toLowerCase();
  }
  public get rectBound() {
    return this.letterRef.current.getBoundingClientRect();
  }
  public setParams(isSelected: boolean, input: string) {
    this.isSelected = isSelected;
    if (input) {
      this.input = input;
    }
    this.forceUpdate();
  }
  public render() {
    return (
      <div className={this.letterClassNames}>
        <ToolTip
          x={this.tooltipDimensions.x}
          y={this.tooltipDimensions.y}
          open={this.isSelected}
          input={this.input}
        />
        <span ref={this.letterRef}>
          {this.props.letter === " " ? <WhiteSpace /> : this.letterDisplay}
        </span>
      </div>
    );
  }
}
export default Letter;
