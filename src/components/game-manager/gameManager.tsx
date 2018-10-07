import * as React from "react";
import LetterData from "../../store/classes/lettter";
import LetterUi from "../letterUi";
import WordPointer from "./WordPointer";
import UnderlinePointer from "./UnderlinePointer";
import "./game.css";
import "animate.css";

interface Props {
  letters: LetterData[];
}

interface State {
  index: number;
  input: string[];
  hasMounted: boolean;
  isTooltipOpen: boolean;
}

export default class GameManager extends React.Component<Props, State> {
  public lettersRefs: any[];
  public textBoxRef: any;
  public tooltipRef: any;
  textboxNode: any;

  constructor(props: Props) {
    super(props);
    this.setRefs = this.setRefs.bind(this);
    this.lettersRefs = [];
    this.onInputChange = this.onInputChange.bind(this);
    this.renderLetter = this.renderLetter.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.state = {
      index: 0,
      hasMounted: false,
      isTooltipOpen: false,
      input: []
    };
    this.textBoxRef = React.createRef();
    this.tooltipRef = React.createRef();
  }
  public onButtonClick() {
    this.setState({
      isTooltipOpen: !this.state.isTooltipOpen
    });
  }
  public componentDidMount() {
    this.textboxNode = document.getElementById("game-text");
    console.log(this.textboxNode);
    this.setState({
      hasMounted: true
    });
  }
  public onInputChange(event: any): void {
    const targetValue = this.props.letters[this.state.index].getValue;
    const input = event.target.value;
    const nextInput = [...this.state.input];
    nextInput[this.state.index] = input;
    if (targetValue === input) {
      this.setState({
        index: this.state.index + 1,
        input: nextInput
      });
    } else {
      this.setState({
        input: nextInput
      });
    }
  }
  public setRefs(ref: any): void {
    // console.log(ref.getBoundingClientRect());
    const nextArr = [...this.lettersRefs, ref];
    this.lettersRefs = nextArr;
  }
  public renderLetter(letter: LetterData, index: number) {
    return (
      <div ref={this.setRefs} key={index} className="letter-wrapper">
        <LetterUi
          letter={letter.getValue}
          isSelected={index === this.state.index}
          input={this.state.input[index]}
        />
      </div>
    );
  }
  get isMounted() {
    return this.state.hasMounted;
  }
  get letterBoundingRect() {
    const coords = this.lettersRefs[this.state.index].getBoundingClientRect();
    return {
      x: coords.left,
      y: coords.top,
      width: coords.width,
      height: coords.height
    };
  }
  get letterCoords() {
    if (this.isMounted) {
      return {
        x: this.letterBoundingRect.x - this.textboxCoords.x,
        y: this.letterBoundingRect.y - this.textboxCoords.y,
        width: this.letterBoundingRect.width,
        height: this.letterBoundingRect.height
      };
    }
    return { x: 0, y: 0, width: 0, height: 0 };
  }
  get textboxCoords() {
    return {
      x: this.textBoxRef.current.getBoundingClientRect().left,
      y: this.textBoxRef.current.getBoundingClientRect().top
    };
  }
  get toolTipBoundingRect() {
    // console.log(this.tooltipRef.current)
    return this.tooltipRef.current.getBoundingClientRect();
  }
  get pointerCoordinates() {
    if (this.isMounted) {
      return {
        x: this.letterCoords.x,
        y: this.letterCoords.y,
        width: this.letterBoundingRect.width,
        height: this.letterBoundingRect.height
      };
    }
    return { x: 0, y: 0 };
  }
  get toolTipCoordinates() {
    if (this.isMounted) {
      const startingPoint = 0 - this.toolTipBoundingRect.width / 2;
      return {
        x: startingPoint + this.letterCoords.width / 2 + this.letterCoords.x,
        y: this.letterCoords.y - this.letterCoords.height - 5
      };
    }
    return {
      x: 0,
      y: 0
    };
  }

  public render() {
    return (
      <div>
        <input onChange={this.onInputChange} value="" />
        <div id="game-text" ref={this.textBoxRef}>
          <WordPointer
            x={this.pointerCoordinates.x}
            y={this.pointerCoordinates.y}
            width={this.pointerCoordinates.width}
            height={this.pointerCoordinates.height}
            input={this.props.letters[this.state.index].getValue}
          />
          <UnderlinePointer
            y={this.letterCoords.y + this.letterCoords.height}
            x={this.letterCoords.x}
            width={this.letterCoords.width}
          />
          {this.props.letters.map(this.renderLetter)}
        </div>
      </div>
    );
  }
}
