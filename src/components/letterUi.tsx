import * as React from "react";
import cx from "classnames";
import WhiteSpace from "./whitespace";
import ToolTip from "./tooltip";

export interface LetterUiProps {
  letter: string;
  isSelected: boolean;
  input: string;
  onRefReceive: (ref: any) => void;
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
  get letterClassNames() {
    return cx("letter animated", {
      success: this.props.input === this.props.letter,
      "is-selected": this.props.isSelected
    });
  }
  get letterDisplay() {
    return this.props.letter.toLowerCase()
  }

    render() {  
    return (
      <div className={this.letterClassNames} ref={this.props.onRefReceive}>
        <ToolTip
          x={this.tooltipDimensions.x}
          y={this.tooltipDimensions.y}
          open={this.props.isSelected}
          input={this.props.input}
        />
        <span ref={this.letterRef}>{this.props.letter===" " ?  <WhiteSpace /> : this.letterDisplay}</span>
      </div>
    );
  }
}
export default Letter;
