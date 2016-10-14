import React from 'react';


export default class ErrorResult extends React.Component {

  render() {
    return (
      <div>
        {this.props.errorMsg}
      </div>
    );
  }
}
