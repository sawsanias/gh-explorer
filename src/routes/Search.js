import React from 'react';
import { RouteHandler } from 'react-router';
import FlexView from 'react-flexview';
import SearchResultPanel from 'components/Search/SearchResultPanel';
import EmptyResult from 'components/Search/EmptyResult';
import UndefinedResult from 'components/Search/UndefinedResult';
import repositories from 'test/repositories.json';

export default class Search extends React.Component {

  render() {
    const undefinedResult = (typeof repositories === 'undefined' || repositories === null);
    const emptyResult = !undefinedResult && repositories.length === 0;
    const foundResult = !undefinedResult && repositories.length > 0; //simply !undefinedResult && !emptyResult

    return (
      <FlexView hAlignContent='center' column grow>
        {undefinedResult && <UndefinedResult />}
        {emptyResult && <EmptyResult />}
        {foundResult && <SearchResultPanel items={repositories} />}
        <RouteHandler />
      </FlexView>
    );
  }
}
