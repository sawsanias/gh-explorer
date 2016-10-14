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
  componentDidMount = () => {
    this.doFocusSelect();
  }
  componentDidUpdate = (prevProps) => {
    if (prevProps.query.query !== this.props.query.query) {
      this.doFocusSelect();
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      query: nextProps.query.query || ''
    });
  }
  doSearch = () => {
    if (this.state.query.trim() !== '') {
      this.context.router.transitionTo('/search', null, { query: this.state.query });
    }
  }
  handleChange = (event) => {
    this.setState({ query: event.target.value });
  }
  doFocusSelect = () => {
    this.myTextInput.focus();
    this.myTextInput.select();
  }

  left = () => <span> GH Explorer </span>;
  right = () => <Button primary icon='search' label='Search' onClick={this.doSearch} buttonState={this.state.query.trim() === '' ? 'not-allowed' : 'ready'} />;
  center = () => (
    <input
      type='text'
      ref={(ref) => {this.myTextInput = ref;}}
      value={this.state.query}
      onChange={this.handleChange}
      placeholder='Search repository'
      className='input-text'
      onKeyDown={e => {if (e.keyCode === 13 ) { this.doSearch(); }}}
    />
  )
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
        <FlexView shrink={false} basis={100}>
          <NavBar {...navBarProps }/>
        </FlexView>
        <FlexView hAlignContent='center' style={{ backgroundColor: 'grey' }} grow column>
          <FlexView grow style={{ backgroundColor: 'blue', maxWidth: 1000 }} width='100%'>
            <RouteHandler/>
          </FlexView>
        </FlexView>
      </FlexView>

  );


  }
}
