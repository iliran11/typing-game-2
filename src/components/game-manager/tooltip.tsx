import * as React from "react";

interface State {}
interface Props {
  x: number;
  y: number;
  open: boolean;
}

class ToolTip extends React.Component<Props, State> {
  tooltipRef : any;
  constructor(props : any) {
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
  public render() {
    if(!this.props.open) return null;
    return (
      <div
        className="top in animated tooltip"
        role="tooltip"
        // style="top: 25px; left: 31.8984px; display: block;"
        ref={this.tooltipRef}
      >
        <div className="tooltip-arrow" />
        <div className="tooltip-inner">a</div>
      </div>
    );
  }
}

export default ToolTip;
