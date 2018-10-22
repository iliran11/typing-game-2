import * as React from "react";
import LetterUi from "./letterUi";
interface Props {
  letters: string[];
  inputArray: string[];
  onRefReceive: (ref: HTMLDivElement[]) => void;
}

interface State {}

export default class LetterGroup extends React.PureComponent<Props, State> {
  private letterRefs: HTMLDivElement[];
  constructor(props: Props) {
    super(props);
    this.setRefs = this.setRefs.bind(this);
    this.letterRefs = [];
  }
  componentDidMount() {
    this.props.onRefReceive(this.letterRefs);
  }
  setRefs(ref: HTMLDivElement) {
    this.letterRefs.push(ref);
  }
  getInput(index: number): string {
    if (Array.isArray(this.props.inputArray) && this.props.inputArray[index]) {
      return this.props.inputArray[index];
    }
    return "";
  }
  render() {
    return (
      <React.Fragment>
        {this.props.letters.map((letter: string, index: number) => {
          return (
            <div key={index} ref={this.setRefs} className="letter-container">
              <LetterUi
                letter={letter}
                input={this.getInput(index)}
                isSelected={false}
              />
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}
