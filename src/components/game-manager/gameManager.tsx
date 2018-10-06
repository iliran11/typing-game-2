import * as React from "react";
import LetterData from "../../store/classes/lettter";
import LetterUi, { LetterStatus } from "../letterUi";
import WordPointer from "./WordPointer";
import "./game.css";

interface Props {
  letters: LetterData[];
}

interface State {
  index: number;
  hasMounted: boolean;
}

export default class GameManager extends React.Component<Props, State> {
  public lettersRefs: any[];
  public textBoxRef: any;
  constructor(props: Props) {
    super(props);
    this.setRefs = this.setRefs.bind(this);
    this.lettersRefs = [];
    this.onInputChange = this.onInputChange.bind(this);
    this.state = {
      index: 0,
      hasMounted: false
    };
    this.textBoxRef = React.createRef();
  }
  public componentDidMount() {
    this.setState({
      hasMounted: true
    });
  }
  public onInputChange(): void {
    this.setState({
      index: this.state.index + 1
    });
  }
  public setRefs(ref: any): void {
    // console.log(ref.getBoundingClientRect());
    const nextArr = [...this.lettersRefs, ref];
    this.lettersRefs = nextArr;
  }
  get isMounted() {
    return this.state.hasMounted;
  }
  get currentLetterLeftCoordinates() {
    return this.lettersRefs[this.state.index].getBoundingClientRect().left;
  }
  get textBoxLeftCoordinates() {
    return this.textBoxRef.current.getBoundingClientRect().left;
  }
  get pointerCoordinates() {
    if (this.isMounted) {
      return this.currentLetterLeftCoordinates - this.textBoxLeftCoordinates;
    }
    return 0;
  }

  public render() {
    return (
      <div>
        <input onChange={this.onInputChange} />
        <p id="game-text" ref={this.textBoxRef}>
          <WordPointer x={this.pointerCoordinates} y={2} width={2} height={1} />
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
      </div>
    );
  }
}
