import React from 'react';
import Counter from 'components/Counter';

export default class AppRoute extends React.Component {

  state = {
    counter: 0
  };

  componentDidMount() {
    this._interval = setInterval(this.updateCounter, 1000);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  updateCounter = () => {
    this.setState({
      counter: this.state.counter + 1
    });
  }

  render() {
    return <Counter seconds={this.state.counter} />;
  }
}
