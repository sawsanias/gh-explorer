import React from 'react';
import { RouteHandler } from 'react-router';
import axios from 'axios';
import FlexView from 'react-flexview';
import SearchResultPanel from 'components/Search/SearchResultPanel';
import EmptyResult from 'components/Search/EmptyResult';
import UndefinedResult from 'components/Search/UndefinedResult';
import ErrorResult from 'components/Search/ErrorResult';

export default class Search extends React.Component {

  state = { repositories: null, errorMsg: null };

  assignRespositories = (response) => {
    this.setState({ repositories: response.data.items, errorMsg: null });
  }

  errorHandler = () => {
    this.setState({ repositories: null, errorMsg: 'Search failed!' });
  }

  fetchRepositories = (q) => {
    if (typeof q !== 'undefined' && q !== null && q.trim() !== '') {
      axios.get('http://api.github.com/search/repositories', { params: { q } })
      .then(this.assignRespositories)
      .catch(this.errorHandler); // eslint-disable-line
    }
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
    const errorResult = this.state.errorMsg !== null;
    const undefinedResult = !errorResult && (typeof this.state.repositories === 'undefined' || this.state.repositories === null);
    const emptyResult = !errorResult && !undefinedResult && this.state.repositories.length === 0;
    const foundResult = !errorResult && !undefinedResult && this.state.repositories.length > 0; //simply !undefinedResult && !emptyResult

    return (
      <FlexView hAlignContent='center' column grow>
        {errorResult && <ErrorResult errorMsg={this.state.errorMsg} />}
        {undefinedResult && <UndefinedResult />}
        {emptyResult && <EmptyResult />}
        {foundResult && <SearchResultPanel items={this.state.repositories} />}
        <RouteHandler />
      </FlexView>
    );
  }
}
