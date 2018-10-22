import * as React from "react";
import socketManager from "../../socketManager";
import LetterGroup from "../LetterGroup";
import { LETTER_GROUP_SIZE } from "../../constants";
import "./game.css";
interface Props {
  letters: string[][];
  dispatch: any;
}

interface State {
  letterGroupIndex: number;
  index: number;
  input: string[][];
  allRefsMounted: boolean;
}

export default class GameManager extends React.Component<Props, State> {
  private letterNodes: Element[][];

  constructor(props: Props) {
    super(props);
    this.state = {
      letterGroupIndex: 0,
      index: 0,
      input: [],
      allRefsMounted: false
    };
    socketManager.initSocket(props.dispatch);
    this.renderLetterGroup = this.renderLetterGroup.bind(this);
    this.buildLetterNodes = this.buildLetterNodes.bind(this);
    this.onInput = this.onInput.bind(this);
    this.letterNodes = [];
  }
  componentDidUpdate(prevProps: Props) {
    // if (prevProps.letters.length === 0 && this.props.letters.length) {
    //   console.log("letter here");
    // }
  }
  componentDidMount() {
    console.log(this.letterNodes);
  }
  buildLetterNodes(ref: HTMLDivElement[]) {
    this.letterNodes.push(ref);
    if (this.letterNodes.length === this.props.letters.length) {
      this.setState({
        allRefsMounted: true,
        input: this.buildEmptyInputArray
      });
    }
  }
  public get buildEmptyInputArray() {
    return new Array(this.props.letters.length).fill(undefined).map(() => {
      return new Array(LETTER_GROUP_SIZE).fill("");
    });
  }
  private renderLetterGroup(letterGroup: string[], index: number) {
    return (
      <div>
        <LetterGroup
          letters={letterGroup}
          onRefReceive={this.buildLetterNodes}
          inputArray={this.state.input[index]}
        />
      </div>
    );
  }
  get incrementIndex(): { letterGroupIndex: number; index: number } {
    const { letterGroupIndex, index } = this.state;
    if (index + 1 === LETTER_GROUP_SIZE) {
      return {
        letterGroupIndex: letterGroupIndex + 1,
        index: 1
      };
    } else {
      return {
        index: index + 1,
        letterGroupIndex
      };
    }
  }
  private updateInputArray(
    letterGroupIndex: number,
    index: number,
    input: string
  ): string[][] {
    const nextInputArray = [...this.state.input];
    const nextGroupInputArray = [...nextInputArray[letterGroupIndex]];
    nextGroupInputArray[index] = input;
    nextInputArray[letterGroupIndex] = nextGroupInputArray;
    return nextInputArray;
  }
  private onInput(event: any) {
    const { letterGroupIndex, index } = this.state;
    const input: string = event.target.value;
    const currentLetter = this.props.letters[letterGroupIndex][index];
    const updatedInput = this.updateInputArray(letterGroupIndex, index, input);
    if (input === currentLetter) {
      this.setState({
        ...this.incrementIndex,
        input: updatedInput
      });
    } else {
      this.setState({
        input: updatedInput
      });
    }
  }

  public render() {
    return (
      <div>
        <input onChange={this.onInput} value={""} />
        {this.props.letters.map(this.renderLetterGroup)}
      </div>
    );
  }
}
