import React from 'react';
import { Route, DefaultRoute } from 'react-router';
import Home from './Home';
import Placeholder from './Placeholder';
import Search from './Search';
import Detail from './Detail';

export default (
  <Route name='main' handler={Home} path='/'>
    <DefaultRoute name='placeholder' handler={Placeholder}/>
    <Route name='search' handler={Search} path='search'>
      <Route name='detail' handler={Detail} path=':id/detail'/>
    </Route>
  </Route>
);
