import React from 'react';
import { RouteHandler } from 'react-router';
import axios from 'axios';
import FlexView from 'react-flexview';
import SearchResultPanel from 'components/Search/SearchResultPanel';
import EmptyResult from 'components/Search/EmptyResult';
import UndefinedResult from 'components/Search/UndefinedResult';

export default class Search extends React.Component {

  state = { repositories: null };

  assignRespositories = (response) => {
    this.setState({ repositories: response.data.items });
  }

  componentDidMount() {
    axios.get('http://api.github.com/search/repositories', { params: { q: this.props.query.query } })
      .then(this.assignRespositories)
      .catch((error) => console.log(error)); // eslint-disable-line
  }

  render() {
    const undefinedResult = (typeof this.state.repositories === 'undefined' || this.state.repositories === null);
    const emptyResult = !undefinedResult && this.state.repositories.length === 0;
    const foundResult = !undefinedResult && this.state.repositories.length > 0; //simply !undefinedResult && !emptyResult

    return (
      <FlexView hAlignContent='center' column grow>
        {undefinedResult && <UndefinedResult />}
        {emptyResult && <EmptyResult />}
        {foundResult && <SearchResultPanel items={this.state.repositories} />}
        <RouteHandler />
      </FlexView>
    );
  }
}
