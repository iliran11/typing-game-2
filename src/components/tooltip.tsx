import * as React from 'react';
import cx from 'classnames';

interface Props {
  x: number;
  y: number;
  input: string;
  isOpen:boolean
}


class ToolTip extends React.Component<Props, object> {
  tooltipRef: any;
  constructor(props: any) {
    super(props);
    this.tooltipRef = React.createRef();
  }
  closeToolTip() {
    this.setState({
      isOpen: false
    });
  }
  get tooltipClass() {
    return cx('top in animated tooltip');
  }
  get innerClass() {
    return cx('tooltip-inner', { 'has-space': this.props.input === ' ' });
  }
  get toolTipStyle() {
    return {
      transform: `translate(${this.props.x}px,${this.props.y}px)`,
      display: this.props.isOpen ? 'initial' : 'none'
    };
  }
  render() {
    return (
      <div
        className={this.tooltipClass}
        role="tooltip"
        ref={this.tooltipRef}
        style={this.toolTipStyle}
      >
        <div className="tooltip-arrow" />
        <div className={this.innerClass}>{this.props.input}</div>
      </div>
    );
  }
}

export default ToolTip;
