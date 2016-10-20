import React from 'react';
import RepositoryDetailModal from 'components/RepositoryDetailModal';
import axios from 'axios';


export default class Detail extends React.Component {

  state = { repository: null };

  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }
  close = () => {
    this.context.router.transitionTo('/search', null, { query: this.context.router.getCurrentQuery().query });
  }
  getModal = () => (
    <RepositoryDetailModal repository={this.state.repository} closeModal={this.close.bind(this)} />
  )
  fetchDetailedRepository = (owner, repos) => {
    //TODO: Handle errors and add load spinner in the modal
    this.setState({ repository: null });
    if (owner && owner.trim() !== '' && repos && repos.trim() !== '') {
      axios.get(`https://api.github.com/repos/${owner}/${repos}`)
      .then((response) => this.setState({ repository: response.data } ))
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
        {this.getModal()}
      </div>
    );

  }
}
