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

  fetchRepositories = (q) => {
    axios.get('http://api.github.com/search/repositories', { params: { q } })
    .then(this.assignRespositories)
    .catch((error) => console.log(error)); // eslint-disable-line
  }

  componentDidMount() {
    this.fetchRepositories(this.props.query.query);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.query.query !== this.props.query.query ) {
      this.fetchRepositories(nextProps.query.query);
    }
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
