import React from 'react';
import ReactDOM from 'react-dom';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import App from './containers/App';
import Reducers from './reducers';

const logger = createLogger({});

const middleware = [
  thunkMiddleware,
  logger,
];

const createStoreWithMiddleware = compose(applyMiddleware(...middleware), autoRehydrate())(createStore);

const store = createStoreWithMiddleware(Reducers);

persistStore(store);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <App name="App" />
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  )
})
