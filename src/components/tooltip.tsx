import * as React from 'react';
import cx from 'classnames';

interface Props {}

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
    return cx('top in animated tooltip words-box-letters');
  }
  get innerClass() {
    return 'tooltip-inner';
  }
  get toolTipStyle() {
    return {
      display: true ? 'initial' : 'none'
    };
  }
  render() {
    return (
      <div className={this.tooltipClass} role="tooltip" id="tooltip">
        <div className="tooltip-arrow" />
        <div className={this.innerClass} id="tooltip-spaceholder">j</div>
      </div>
    );
  }
}

export default ToolTip;
