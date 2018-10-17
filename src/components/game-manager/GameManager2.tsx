import * as React from "react";
import socketManager from "../../socketManager";
import LetterGroup from "../LetterGroup";
import "./game.css";
interface Props {
  letters: string[][];
  dispatch: any;
}

interface State {}

export default class GameManager extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    socketManager.initSocket(props.dispatch);
    this.renderLetterGroup = this.renderLetterGroup.bind(this);
  }
  componentDidUpdate(prevProps: Props) {
    // if (prevProps.letters.length === 0 && this.props.letters.length) {
    //   console.log("letter here");
    // }
  }
  renderLetterGroup(letterGroup: string[]) {
    return (
      <span>
        <LetterGroup letters={letterGroup} />
      </span>
    );
  }
  public render() {
    return <div>{this.props.letters.map(this.renderLetterGroup)}</div>;
  }
}
