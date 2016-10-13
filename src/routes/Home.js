import React from 'react';
import { RouteHandler } from 'react-router';
import FlexView from 'react-flexview';
import Button from '../components/Button';
import NavBar from '../components/NavBar';

export default class Home extends React.Component {
  state = { query: this.props.query.query || '' };

  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }
  onClick = () => {
    this.context.router.transitionTo('/search', null, { query: this.state.query });
  }

  handleChange = (event) => {
    this.setState({ query: event.target.value });
  }

  left = () => <span> GH Explorer </span>;
  right = () => <Button primary icon='search' label='Search' onClick={this.onClick} />;
  center = () =>   <input value={this.state.query} onChange={this.handleChange} type='text' placeholder='Search repository' className='input-text' />

  componentWillReceiveProps(nextProps) {
    this.setState({
      query: nextProps.query.query || ''
    });
  }

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
