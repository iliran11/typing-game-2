import * as React from "react";
import LetterData from "../../store/classes/lettter";
import LetterUi, { LetterStatus } from "../letterUi";

interface Props {
  letters: LetterData[];
}

interface State {}

export default class GameManager extends React.Component<Props, State> {
  public lettersRefs: any[];
  constructor(props: Props) {
    super(props);
    this.setRefs = this.setRefs.bind(this);
    this.lettersRefs = [];
  }
  public setRefs(ref: any): void {
    const nextArr = [...this.lettersRefs, ref];
    this.lettersRefs = nextArr;
  }
  componentDidMount() {
    console.log(this.lettersRefs)
  }
  public render() {
    return (
      <p>
        {this.props.letters.map((letter: LetterData, index) => {
          return (
            <span ref={this.setRefs} key={index}>
              <LetterUi
                letter={letter.getValue}
                isSelected={false}
                status={LetterStatus.Correct}
              />
            </span>
          );
        })}
      </p>
    );
  }
}
