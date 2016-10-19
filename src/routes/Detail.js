import React from 'react';
import RepositoryDetailModal from 'components/RepositoryDetailModal';
import axios from 'axios';


export default class Detail extends React.Component {
  state = { isOpen: false };

  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }
  open = () => {
    this.setState({ repository: null, isOpen: true });
  }
  close = () => {
    this.setState({ isOpen: false });
    this.context.router.goBack();
  }
  getModal = () => (
    <RepositoryDetailModal repository={this.state.repository} closeModal={this.close.bind(this)} />
  )
  fetchDetailedRepository = (owner, repos) => {
    //show the modal only after the response
    //TODO: in future open modal with spinner
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
  componentDidUpdate = () => {
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
