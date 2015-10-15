import 'babel-core/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ItemThreadList from './containers/ItemThreadList';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
  		<ItemThreadList />
  </Provider>,
  document.getElementById('root')
);