import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FormattedDuration from '../FormattedDuration/FormattedDuration';
import FormattedTime from '../FormattedTime/FormattedTime';
import './TimeRow.css';

class TimeRow extends Component {

  constructor(props) {
    super(props);

    this.deleteTime = this.deleteTime.bind(this);
  }

  deleteTime() {
    if ('function' === typeof this.props.deleteTime) {
      this.props.deleteTime(this.props.time);
    }
  }

  render() {
    return (
      <div className="TimeRow">
        <div className="duration">
          <FormattedDuration duration={ this.props.time.duration }></FormattedDuration>
        </div>
        <div className="recordedTime">
          <FormattedTime time={ this.props.time.recordedTime }></FormattedTime>
        </div>
        <button
          className="deleteButton"
          onClick={ this.deleteTime }
        >Delete</button>
      </div>
    )
  }
}

TimeRow.propTypes = {
  time: PropTypes.object,
  deleteTime: PropTypes.func
}

export default TimeRow;
