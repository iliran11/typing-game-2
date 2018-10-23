import * as React from 'react';

interface Props {
  name: string;
  score: number;
  compeletedPercntage:number;
}

class Competitor extends React.PureComponent<Props, object> {
  render() {
    return (
      <div>
        {this.props.name} score: {this.props.score}
      </div>
    );
  }
}

export default Competitor;
