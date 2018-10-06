import * as React from "react";

interface State {}
interface Props {
  x: number;
  y: number;
  setRef: any;
  open: boolean;
}

class ToolTip extends React.Component<Props, State> {
  public componentDidUpdate(prevProps: any) {
    const toolTipRef = this.props.setRef.current
    // is opened
    if (prevProps.open === false && this.props.open) {
      toolTipRef.classList.remove('bounceOutDown')
      toolTipRef.classList.add('bounceInUp')
    }
    // is closed
    if (prevProps.open && this.props.open === false) {
      toolTipRef.classList.add('bounceOutDown')
      toolTipRef.classList.remove('bounceInUp')
    }
  }
  public render() {
    // if(!this.props.open) return null;
    return (
      <div
        className="fade top in animated"
        role="tooltip"
        id="tooltip"
        // style="top: 25px; left: 31.8984px; display: block;"
        style={{
          left: this.props.x,
          top: this.props.y,
          display: 'block'
        }}
        ref={this.props.setRef}
      >
        <div className="tooltip-arrow" />
        <div className="tooltip-inner">a</div>
      </div>
    );
  }
}

export default ToolTip;
