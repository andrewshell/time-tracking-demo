import React  from 'react';
import PropTypes from 'prop-types';
import FormattedDuration from './FormattedDuration';
import FormattedTime from './FormattedTime';
import styles from './TimeRow.module.css';

function TimeRow(props) {
  function deleteTime(props) {
    props.deleteTime(props.time);
  }

  return (
    <div className={ styles.TimeRow }>
      <div className={ styles.duration }>
        <FormattedDuration duration={ props.time.duration }></FormattedDuration>
      </div>
      <div className={ styles.recordedTime }>
        <FormattedTime time={ props.time.recordedTime }></FormattedTime>
      </div>
      <div className={ styles.deleteButton }>
        <button type="button" onClick={ deleteTime.bind(null, props) }>Delete</button>
      </div>
    </div>
  )
}

TimeRow.propTypes = {
  time: PropTypes.object.isRequired,
  deleteTime: PropTypes.func.isRequired
}

export default TimeRow;
