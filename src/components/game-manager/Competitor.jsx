import * as React from "react";

interface Props {
  name: string;
}

class Competitor extends React.PureComponent<Props, object> {
  render() {
    return <div>{this.props.name}</div>;
  }
}

export default Competitor;
