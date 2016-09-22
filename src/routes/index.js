import React from 'react';
import { Route } from 'react-router';
import App from './AppRoute';

class Useless extends React.Component {
  render() {
    return <div>I'm useless</div>;
  }
}

export default (
  <Route name='main' path='/'>
    <Route name='counter' handler={App} path='counter' />
    <Route name='useless' handler={Useless} path='useless' />
  </Route>
);
