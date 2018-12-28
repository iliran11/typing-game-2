import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './AppContainer';
import './index.css';
import configureStore from './store/store';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
