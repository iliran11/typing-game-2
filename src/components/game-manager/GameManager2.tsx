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
  componentDidUpdate(prevProps: Props) {
    if(prevProps.letters.length===0 && this.props.letters.length) {
      console.log('letter here')
    }
  }
  public render() {
    console.log(this.props.letters);
    return <div>hello</div>;
  }
}
