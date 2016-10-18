import React from 'react';
import RepositoryDetailModal from 'components/RepositoryDetailModal';
import axios from 'axios';


export default class Detail extends React.Component {
  state = { isOpen: this.props.query.openModal };

  open = () => {
    this.setState({ repository: null, isOpen: false });
  }
  close = () => this.setState({ isOpen: false })
  getModal = () => (
    <RepositoryDetailModal repository={this.state.repository} closeModal={this.close.bind(this)} />
  )

  fetchDetailedRepository = (owner, repos) => {
    this.setState({ isOpen: false });
    if (owner && owner.trim() !== '' && repos && repos.trim() !== '') {
      axios.get(`https://api.github.com/repos/${owner}/${repos}`)
      .then((response) => this.setState({ isOpen: true, repository: response.data } ))
      .catch((error) => console.log(error)); // eslint-disable-line
    }
  }
  componentDidMount() {
    this.fetchDetailedRepository(this.props.params.owner, this.props.params.repos);
  }

  componentWillReceiveProps(nextProps) {
    if ( (nextProps.params.owner !== this.props.params.owner) ||  (nextProps.params.repos !== this.props.params.repos) ) {
      this.fetchDetailedRepository(nextProps.params.owner, nextProps.params.repos);
    }
  }

  render() {
    return (
      <div>
        {this.state.isOpen && this.getModal()}
      </div>
    );

  }
}
