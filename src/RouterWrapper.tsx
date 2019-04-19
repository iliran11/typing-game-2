import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

export default class RouterWrapper extends React.Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <Router>
        <App />
      </Router>
    );
  }
}
