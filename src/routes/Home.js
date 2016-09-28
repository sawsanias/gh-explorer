import React from 'react';
import NavBar from 'components/NavBar';
import { RouteHandler } from 'react-router';


export default class Home extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <RouteHandler/>
      </div>
  );


  }
}
