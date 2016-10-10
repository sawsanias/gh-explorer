import React from 'react';
import { RouteHandler } from 'react-router';
import FlexView from 'react-flexview';
import { NavBar, Button } from 'buildo-react-components';



export default class Home extends React.Component {

  onClick = () => alert('Search now!');
  left = () => <span> GH Explorer </span>;
  right = () => <Button primary icon='search' label='Search' onClick={this.onClick} />;
  center = () =>   <input value={this.props.query} type='text' placeholder='Search repository' className='input-text' />

  render() {
    const navBarProps = {
      content: {
        left: this.left(),
        right: this.right(),
        center: this.center()
      },
      background: 'red',
      height: 100
    };

    return (
      <FlexView column height='100%' width='100%'>
        <NavBar {...navBarProps }/>
        <FlexView hAlignContent='center' style={{ backgroundColor: 'grey' }} grow column>
          <FlexView grow style={{ backgroundColor: 'blue', maxWidth: 1000 }} width='100%'>
            <RouteHandler/>
          </FlexView>
        </FlexView>
      </FlexView>

  );


  }
}
