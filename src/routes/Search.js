import React from 'react';
import { RouteHandler } from 'react-router';
import FlexView from 'react-flexview';
import SearchResultPanel from 'components/Search/SearchResultPanel';
import EmptyResult from 'components/Search/EmptyResult';
import UndefinedResult from 'components/Search/UndefinedResult';

//TODO: To gete the json from the service
const repositories = [
  { name: 'Rep1', author: 'Sawsan', date: '12/01/2017', description: 'this is a test repository' },
  { name: 'Rep2', author: 'Sawsan', date: '12/01/2017', description: 'this is a test repository' },
  { name: 'Rep3', author: 'Sawsan', date: '12/01/2017', description: 'this is a test repository' },
  { name: 'Rep4', author: 'Sawsan', date: '12/01/2017', description: 'this is a test repository' },
  { name: 'Rep5', author: 'Sawsan', date: '12/01/2017', description: 'this is a test repository' },
  { name: 'Rep6', author: 'Sawsan', date: '12/01/2017', description: 'this is a test repository' },
  { name: 'Rep7', author: 'Sawsan', date: '12/01/2017', description: 'this is a test repository' },
  { name: 'Rep8', author: 'Sawsan', date: '12/01/2017', description: 'this is a test repository' }
];


export default class Search extends React.Component {

  render() {
    const undefinedResult = (typeof repositories === 'undefined' || repositories === null);
    const emptyResult = !undefinedResult && repositories.length === 0;
    const foundResult = !undefinedResult && repositories.length > 0; //simply !undefinedResult && !emptyResult

    return (
      <FlexView hAlignContent='center' column>
        {undefinedResult && <UndefinedResult />}
        {emptyResult && <EmptyResult />}
        {foundResult && <SearchResultPanel items={repositories} />}
        <RouteHandler />
      </FlexView>
    );
  }
}
