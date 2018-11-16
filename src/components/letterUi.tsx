import * as React from "react";
import cx from "classnames";
import WhiteSpace from "./whitespace";

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
  get inputLowerCase(){
    return this.props.input && this.props.input.toLowerCase();
  }
  get letterLowerCase() {
    return this.props.letter && this.props.letter.toLowerCase();

  }
  get letterClassNames() {

    return cx("letter animated", {
      success: this.inputLowerCase === this.letterLowerCase,
      "is-selected": this.props.isSelected
    });
  }
  get letterDisplay() {
    return this.props.letter.toLowerCase()
  }

    render() {  
    return (
      <div className={this.letterClassNames} ref={this.props.onRefReceive}>
        <span ref={this.letterRef}>{this.props.letter===" " ?  <WhiteSpace /> : this.letterDisplay}</span>
      </div>
    );
  }
}
export default Letter;
