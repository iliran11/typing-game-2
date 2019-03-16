import * as React from 'react';
import * as ReactDOM from 'react-dom';
import RouterWrapper from './RouterWrapper';
import configureStore from './store/store';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/browser';
import { Store } from 'src/middlewares/Store';

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

Store.setStore(configureStore());
console.log(Store.store);
ReactDOM.render(
  <Provider store={Store.store}>
    <RouterWrapper />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
