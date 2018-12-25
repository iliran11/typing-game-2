import React, { PureComponent } from 'react';

class ReplayPage extends PureComponent {
  constructor(props: any) {
    super(props);
    props.fetchReplay(props.roomId);
  }
  render() {
    return <div>replay</div>;
  }
}

export default ReplayPage;
