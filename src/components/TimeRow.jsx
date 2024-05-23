import PropTypes from 'prop-types';
import FormattedDuration from './FormattedDuration';
import FormattedTime from './FormattedTime';
import styles from './TimeRow.module.css';

function TimeRow({ time, deleteTime }) {
  const handleDelete = () => {
    deleteTime(time);
  };

  return (
    <div className={ styles.TimeRow }>
      <div className={ styles.duration }>
        <FormattedDuration duration={ time.duration } />
      </div>
      <div className={ styles.recordedTime }>
        <FormattedTime time={ time.recordedTime } />
      </div>
      <div className={ styles.deleteButton }>
        <button type="button" onClick={ handleDelete }>Delete</button>
      </div>
    </div>
  )
}

TimeRow.propTypes = {
  time: PropTypes.object.isRequired,
  deleteTime: PropTypes.func.isRequired
}

export default TimeRow;
