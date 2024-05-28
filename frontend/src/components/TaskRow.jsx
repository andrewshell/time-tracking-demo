import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import FormattedDuration from './FormattedDuration';
import TimeRow from './TimeRow';
import styles from './TaskRow.module.css';

function TaskRow ({ task, continueTask, deleteTime }) {
  const [expanded, setExpanded] = useState(false);

  const toggleDetails = useCallback(() => {
    setExpanded(prevExpanded => !prevExpanded);
  }, []);

  const handleContinueTask = useCallback(() => {
    continueTask(task);
  }, [continueTask, task]);

  const handleDeleteTime = useCallback((time) => {
    deleteTime(time);
  }, [deleteTime]);

  const arrowIcon = expanded ? 'img/md-arrow-dropdown.svg' : 'img/md-arrow-dropright.svg';

  return (
    <div className={ styles.TaskRow }>
      <div className={ styles.summary }>
        <div className={ styles.toggleButton }>
          <button type="button" onClick={ toggleDetails }>
            <img src={ arrowIcon } alt="Toggle" />
          </button>
        </div>
        <div className={ styles.duration }>
          <FormattedDuration duration={ task.duration } />
        </div>
        <div className={ styles.taskName }>
          { task.taskName }
        </div>
        <div className={ styles.continueButton }>
          <button type="button" onClick={ handleContinueTask }>Continue</button>
        </div>
      </div>
      <div className={ expanded ? styles.details : styles.hidden }>
      {task.timeEntries.map((time, i) => {
        return (
          <TimeRow
            key={ time.recordedTime }
            time={ time }
            deleteTime={ handleDeleteTime }
          />
        );
      })}
      </div>
    </div>
  );
}

TaskRow.propTypes = {
  task: PropTypes.object.isRequired,
  continueTask: PropTypes.func.isRequired,
  deleteTime: PropTypes.func.isRequired
};

export default TaskRow;
