import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FormattedDuration from '../FormattedDuration/FormattedDuration';
import FormattedTime from '../FormattedTime/FormattedTime';
import styles from './TimeRow.module.scss';

class TimeRow extends Component {

  constructor(props) {
    super(props);

    this.deleteTime = this.deleteTime.bind(this);
  }

  deleteTime() {
    this.props.deleteTime(this.props.time);
  }

  render() {
    return (
      <div className={ styles.TimeRow }>
        <div className={ styles.duration }>
          <FormattedDuration duration={ this.props.time.duration }></FormattedDuration>
        </div>
        <div className={ styles.recordedTime }>
          <FormattedTime time={ this.props.time.recordedTime }></FormattedTime>
        </div>
        <button
          className={ styles.deleteButton }
          onClick={ this.deleteTime }
        >Delete</button>
      </div>
    )
  }
}

TimeRow.propTypes = {
  time: PropTypes.object.isRequired,
  deleteTime: PropTypes.func.isRequired
}

export default TimeRow;
