import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './AppContainer';
import configureStore from './store/store';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: 'https://f56a1efc23bc47abb7b9807bf2fbf077@sentry.io/1374851',
  environment: process.env.REACT_APP_ENV,
  // @ts-ignore
  integrations: [
    new Sentry.Integrations.Breadcrumbs({
      console: false
    })
  ]
});

const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
