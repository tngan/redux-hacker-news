import 'babel-core/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import NewsThreadList from './components/NewsThreadList';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
  		<NewsThreadList />
  </Provider>,
  document.getElementById('root')
);
