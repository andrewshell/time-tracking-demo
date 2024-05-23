import { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './EntryForm.module.css';

function EntryForm({ currentTime, recordTimeEntry }) {
  const [editMode, setEditMode] = useState(false);
  const [recordedTime, setRecordedTime] = useState(currentTime.format('h:mm a'));
  const [taskName, setTaskName] = useState('');
  const timeEntryRef = useRef();

  const timeIcon = editMode ? 'img/md-close-circle-outline.svg' : 'img/md-time.svg';

  const timeValue = editMode ? recordedTime : currentTime.format('h:mm a');

  const enterEditMode = useCallback(() => {
    setEditMode(true);
    setRecordedTime(currentTime.format('h:mm a'));
  }, [currentTime]);

  const formatRecordedTime = useCallback((time) => {
    time = time.trim().toLowerCase();

    const rxTime = /(\d+):(\d+)\s*(am|pm)?/;
    const timeParts = time.match(rxTime);

    if (timeParts === null) {
      return null;
    }

    if (timeParts[3] !== undefined) {
      if (timeParts[1] === '12') {
        timeParts[1] = '0';
      }

      if (timeParts[3] === 'pm') {
        timeParts[1] = (parseInt(timeParts[1], 10) + 12).toString();
      }
    }

    return timeParts[1].padStart(2, '0') + ':' + timeParts[2].padStart(2, '0');
  }, []);

  const handleChangeTime = useCallback((event) => {
    setRecordedTime(event.target.value);
  }, []);

  const updateTaskName = useCallback((event) => {
    setTaskName(event.target.value);
  }, []);

  const resetForm = useCallback(() => {
    setEditMode(false);
    setRecordedTime(currentTime.format('h:mm a'));
    setTaskName('');
  }, [currentTime]);

  const handleRecordTimeEntry = useCallback((event) => {
    event.preventDefault();

    const timeEntry = {
      recordedTime: formatRecordedTime(recordedTime),
      taskName: taskName.trim()
    };

    if (timeEntry.taskName.length > 0 && timeEntry.recordedTime !== null) {
      recordTimeEntry(timeEntry);
    }

    resetForm();
  }, [formatRecordedTime, recordedTime, recordTimeEntry, taskName, resetForm]);

  return (
    <form className={styles.EntryForm} onSubmit={handleRecordTimeEntry}>
      <div className={styles.resetButton}>
        <button type="button" onClick={resetForm}>
          <img src={timeIcon} alt="Reset" />
        </button>
      </div>
      <div className={styles.recordedTime}>
        <input
          type="text"
          value={timeValue}
          onChange={handleChangeTime}
          onFocus={enterEditMode}
          ref={timeEntryRef}
        />
      </div>
      <div className={styles.taskName}>
        <input
          type="text"
          placeholder="What are you working on?"
          value={taskName}
          onChange={updateTaskName}
        />
      </div>
      <div className={styles.startButton}>
        <button type="submit">Start</button>
      </div>
    </form>
  );
}

EntryForm.propTypes = {
  currentTime: PropTypes.object.isRequired,
  recordTimeEntry: PropTypes.func.isRequired,
};

export default EntryForm;
