import React from 'react';
import Modal from '../Modal';
import FlexView from 'react-flexview';
import Button from '../Button';
import LoadingSpinner from '../LoadingSpinner';
import ErrorResult from '../Search/ErrorResult';

import './repositoryDetailModal.scss';

export default class RepositoryDetailModal extends React.Component {
  render() {
    const isFetching = this.props.isFetching;
    const errorResult = this.props.errorMsg !== null;
    const undefinedResult = !isFetching && !errorResult && (typeof this.props.repository === 'undefined' || this.props.repository === null);
    const foundResult = !isFetching && !errorResult && !undefinedResult;
    return (
      <Modal
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        title='Repository Details'
        footer={
          <FlexView hAlignContent='right'>
            <Button primary size='small' onClick={this.props.closeModal}>Close</Button>
          </FlexView>
        }
      >
        <FlexView hAlignContent='center' column grow>
          {isFetching &&
          (<div style={{ position: 'relative', height: 300, width: '100%' }}>
            <LoadingSpinner
              size={50}
              message={{ content: 'Loading ...' }}
            />
          </div>)}
          {errorResult && <ErrorResult errorMsg={this.props.errorMsg} />}
          {foundResult &&
            <div>
              <div>Name: {this.props.repository.name}</div>
              <div>Description: {this.props.repository.description}</div>
              <div>Owner: {this.props.repository.owner.login}</div>
              <div>Open Issues count: {this.props.repository.open_issues_count}</div>
            </div>
          }
        </FlexView>

      </Modal>
    );
  }

}
