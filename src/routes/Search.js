import React from 'react';
import { RouteHandler } from 'react-router';
import axios from 'axios';
import FlexView from 'react-flexview';
import LoadingSpinner from '../components/LoadingSpinner';
import SearchResultPanel from 'components/Search/SearchResultPanel';
import EmptyResult from 'components/Search/EmptyResult';
import UndefinedResult from 'components/Search/UndefinedResult';
import ErrorResult from 'components/Search/ErrorResult';

export default class Search extends React.Component {

  state = { repositories: null, errorMsg: null, isFetching: false };

  assignRespositories = (response) => {
    this.setState({ repositories: response.data.items, errorMsg: null, isFetching: false });
  }

  errorHandler = () => {
    this.setState({ repositories: null, errorMsg: 'Search failed!', isFetching: false });
  }

  fetchRepositories = (q) => {
    this.setState({ repositories: null, errorMsg: null, isFetching: false });
    if (typeof q !== 'undefined' && q !== null && q.trim() !== '') {
      //reset the states
      this.setState({ isFetching: true });
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
    const isFetching = this.state.isFetching;
    const errorResult = this.state.errorMsg !== null;
    const undefinedResult = !isFetching && !errorResult && (typeof this.state.repositories === 'undefined' || this.state.repositories === null);
    const emptyResult = !isFetching && !errorResult && !undefinedResult && this.state.repositories.length === 0;
    const foundResult = !isFetching && !errorResult && !undefinedResult && this.state.repositories.length > 0; //simply !undefinedResult && !emptyResult
    return (
      <FlexView hAlignContent='center' column grow>
        {isFetching &&
        (<div style={{ position: 'relative', height: 300, width: '100%' }}>
          <LoadingSpinner
            size={50}
            message={{ content: 'Loading ...' }}
          />
        </div>)}
        {undefinedResult && <UndefinedResult />}
        {errorResult && <ErrorResult errorMsg={this.state.errorMsg} />}
        {emptyResult && <EmptyResult />}
        {foundResult && <SearchResultPanel items={this.state.repositories} />}
        <RouteHandler />
      </FlexView>
    );
  }
}
