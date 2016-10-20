import React from 'react';
import Modal from '../Modal';
import FlexView from 'react-flexview';
import Button from '../Button';

import './repositoryDetailModal.scss';

export default class RepositoryDetailModal extends React.Component {
  render() {
    const undefinedResult = (typeof this.props.repository === 'undefined' || this.props.repository === null);
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
      {!undefinedResult &&
        <div>
          <div>Name: {this.props.repository.name}</div>
          <div>Description: {this.props.repository.description}</div>
          <div>Owner: {this.props.repository.owner.login}</div>
          <div>Open Issues count: {this.props.repository.open_issues_count}</div>
        </div>
      }
      </Modal>
    );
  }

}
