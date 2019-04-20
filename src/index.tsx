import * as React from 'react';
import * as ReactDOM from 'react-dom';
import RouterWrapper from './RouterWrapper';
import configureStore from './store/store';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { Store } from 'src/middlewares/Store';
import {EnviromentsManager} from 'src/middlewares/EnviromentsManager';



EnviromentsManager.SentryInit();

Store.setStore(configureStore());
ReactDOM.render(
  <Provider store={Store.store}>
    <RouterWrapper />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
