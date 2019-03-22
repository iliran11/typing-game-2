import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

export default class RouterWrapper extends React.Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div className="gradient-6" id="app-container">
        <Router>
          <App />
        </Router>
      </div>
    );
  }
}
