import * as React from "react";
import cx from "classnames";

interface Props {
  x: number;
  y: number;
  open: boolean;
  input: string;
}

class ToolTip extends React.Component<Props, {}> {
  tooltipRef: any;
  constructor(props: any) {
    super(props);
    this.tooltipRef = React.createRef();
  }
  get tooltipClass() {
    return cx("top in animated tooltip");
  }
  get innerClass() {
    return cx("tooltip-inner", { "has-space": (this.props.input === " ") });
  }
  get toolTipPosition() {
    return {
      transform: `translate(${this.props.x}px,${this.props.y}px)`
    }
  }
  render() {
    return (
      <div
        className={this.tooltipClass}
        role="tooltip"
        ref={this.tooltipRef}
        style={this.toolTipPosition}
      >
        <div className="tooltip-arrow" />
        <div className={this.innerClass}>{this.props.input}</div>
      </div>
    );
  }
}

export default ToolTip;
