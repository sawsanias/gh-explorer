import React from 'react';
import Modal from '../Modal';
import FlexView from 'react-flexview';
import Button from '../Button';

import './repositoryDetailModal.scss';

export default class RepositoryDetailModal extends React.Component {

  render() {
    return (
      <Modal
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        onDismiss={this.close}
        title='Repository Details'
        footer={
          <FlexView hAlignContent='right'>
            <Button primary size='small' onClick={this.props.closeModal}>Close</Button>
          </FlexView>
        }
      >
        TODO: adding the details of  a repository.
      </Modal>
    );
  }

}
