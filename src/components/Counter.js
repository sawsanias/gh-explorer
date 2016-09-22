import React from 'react';
import { skinnable } from 'revenge';
import { t, props } from 'tcomb-react';

@skinnable()
@props({
  seconds: t.Number
})
export default class Counter extends React.Component {

  getLocals() {
    const seconds = this.props.seconds;
    const minutes = Math.floor(seconds / 60);
    return {
      minutes,
      seconds: seconds - (60 * minutes)
    };
  }

  template({ minutes, seconds }) {
    return (
      <div>{minutes} minutes, {seconds} seconds elapsed</div>
    );
  }
}
