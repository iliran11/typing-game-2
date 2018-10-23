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
    const isActive = this.props.open && this.props.input;
    return cx("top in animated tooltip", {
      active: isActive,
      "non-active": !isActive
    });
  }
  get innerClass() {
    return cx("tooltip-inner", { "has-space": (this.props.input === " ") });
  }
  render() {
    return (
      <div
        className={this.tooltipClass}
        role="tooltip"
        ref={this.tooltipRef}
      >
        <div className="tooltip-arrow" />
        <div className={this.innerClass}>{this.props.input}</div>
      </div>
    );
  }
}

export default ToolTip;
