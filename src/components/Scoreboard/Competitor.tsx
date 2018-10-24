import * as React from 'react';
import './competitor.css'

interface Props {
  name: string;
  score: number;
  compeletedPercntage:number;
}

class Competitor extends React.PureComponent<Props, object> {
  progressBarRef: any;
  progressbarWidth: number;
  constructor(props: Props) {
   super(props); 
   this.progressBarRef = React.createRef();
  }
  get normalizedWpmScore(){
    return Math.floor(this.props.score)
  }
  get avatarTransform() {
    if(!this.progressBarRef.current) {
      return 0;
    }
    if(this.progressBarRef.current) {
      this.progressbarWidth = this.progressBarRef.current.clientWidth
    }
    // console.log(`bar width:${this.progressbarWidth}. percent:${this.props.compeletedPercntage}. result: ${this.props.compeletedPercntage * this.progressbarWidth}`)
    return this.props.compeletedPercntage * this.progressbarWidth;
  }
  get avatarStyle() {
    return {
      transform: `translateX(${this.avatarTransform}px)`
    }
  }
  render() {
    return (
      <div className="competitor-container">
        <div className="competitor-name-section">
            {this.props.name}
        </div>
        <div className="competitor-progress">
          <div className="progress-bar" ref={this.progressBarRef}/>
          <div className="avatar" style={this.avatarStyle}/>
          </div>
        <div className="competitor-wpm">{this.normalizedWpmScore}</div>
      </div>
    );
  }
}

export default Competitor;
