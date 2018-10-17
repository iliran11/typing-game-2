import * as React from "react";
import socketManager from "../../socketManager";
interface Props {
  letters: string[];
  dispatch: any;
}

interface State {}

export default class GameManager extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    socketManager.initSocket(props.dispatch);
  }
  public render() {
    console.log(this.props.letters);
    return <div>hello</div>;
  }
}
