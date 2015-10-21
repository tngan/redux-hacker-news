import React from 'react';
import { Route } from 'react-router';
import ItemThreadList from './containers/ItemThreadList';

export default (
  <Route path="/" component={ItemThreadList}>
  	<Route path="/newest" component={ItemThreadList} />
  	<Route path="/newcomments" component={ItemThreadList} />
    <Route path="/show" component={ItemThreadList} />
    <Route path="/ask" component={ItemThreadList} />
    <Route path="/jobs" component={ItemThreadList} />
  </Route>
);