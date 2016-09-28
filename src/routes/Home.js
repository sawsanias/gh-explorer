import React from 'react';
import NavBar from 'components/NavBar';
import { RouteHandler } from 'react-router';
import FlexView from 'react-flexview';



export default class Home extends React.Component {
  render() {
    return (
      <FlexView column height='100%' width='100%'>
        <NavBar />
        <FlexView hAlignContent='center' style={{ backgroundColor: 'grey' }} grow column>
          <FlexView grow style={{ backgroundColor: 'blue', maxWidth: 1000 }} width='100%'>
            <RouteHandler/>
          </FlexView>
        </FlexView>
      </FlexView>
  );


  }
}
