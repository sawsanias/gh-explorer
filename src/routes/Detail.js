import React from 'react';
import RepositoryDetailModal from 'components/RepositoryDetailModal';
import axios from 'axios';


export default class Detail extends React.Component {

  state = { repository: null,  errorMsg: null, isFetching: false };

  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }
  close = () => {
    this.context.router.transitionTo('/search', null, { query: this.context.router.getCurrentQuery().query });
  }
  getModal = () => (
    <RepositoryDetailModal repository={this.state.repository} isFetching={this.state.isFetching} errorMsg={this.state.errorMsg} closeModal={this.close.bind(this)} />
  )
  fetchDetailedRepository = (owner, repos) => {
    this.setState({ repository: null, errorMsg: null, isFetching: false });
    if (owner && owner.trim() !== '' && repos && repos.trim() !== '') {
      this.setState({ isFetching: true });
      axios.get(`https://api.github.com/repos/${owner}/${repos}`)
      .then((response) => this.setState({ repository: response.data, errorMsg: null, isFetching: false } ))
      .catch(() => this.setState({ repository: null, errorMsg: 'Error!', isFetching: false }) );
    } else {
      this.setState({ repository: null, errorMsg: 'missing parameters!', isFetching: false });
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
