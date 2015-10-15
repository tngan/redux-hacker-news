import { createStore, applyMiddleware, compose } from 'redux';
import rthunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { reduxReactRouter } from 'redux-router';
import createHistory from 'history/lib/createBrowserHistory';
import rootReducer from '../reducers';
import routes from '../routes';

const createStoreWithMiddleware = compose(
    applyMiddleware(rthunk),
    reduxReactRouter({routes,createHistory}),
    applyMiddleware(createLogger())
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}