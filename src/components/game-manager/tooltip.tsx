import * as React from "react";
import cx from "classnames";

interface State {}
interface Props {
  x: number;
  y: number;
  open: boolean;
  input: string;
}

class ToolTip extends React.Component<Props, State> {
  tooltipRef: any;
  constructor(props: any) {
    super(props);
    this.tooltipRef = React.createRef();
  }
  public componentDidUpdate(prevProps: any) {
    // const toolTipRef = this.tooltipRef.current
    // is opened
    if (prevProps.open === false && this.props.open) {
      // toolTipRef.classList.remove('bounceOutDown')
      // toolTipRef.classList.add('bounceInUp')
    }
    // is closed
    if (prevProps.open && this.props.open === false) {
      // toolTipRef.classList.add('bounceOutDown')
      // toolTipRef.classList.remove('bounceInUp')
    }
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
  public render() {
    // if (!this.props.open) return null;
    return (
      <div
        className={this.tooltipClass}
        role="tooltip"
        // style="top: 25px; left: 31.8984px; display: block;"
        ref={this.tooltipRef}
      >
        <div className="tooltip-arrow" />
        <div className={this.innerClass}>{this.props.input}</div>
      </div>
    );
  }
}

export default ToolTip;
