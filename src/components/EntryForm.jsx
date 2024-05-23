import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './EntryForm.module.css';

class EntryForm extends Component {
  state = {
    editMode: false,
    recordedTime: '',
    taskName: ''
  };

  constructor(props) {
    super(props);

    this.state.recordedTime = this.props.currentTime.format('h:mm a');

    this.enterEditMode = this.enterEditMode.bind(this);
    this.handleChangeTime = this.handleChangeTime.bind(this);
    this.recordTimeEntry = this.recordTimeEntry.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.updateTaskName = this.updateTaskName.bind(this);

    this.timeEntryRef = React.createRef();
  }

  get timeIcon() {
    if (this.state.editMode) {
      return 'img/md-close-circle-outline.svg';
    }

    return 'img/md-time.svg';
  }

  get timeValue() {
    if (this.state.editMode) {
      return this.state.recordedTime;
    }

    return this.props.currentTime.format('h:mm a');
  }

  enterEditMode() {
    this.setState({
      editMode: true,
      recordedTime: this.props.currentTime.format('h:mm a')
    });
  }

  formatRecordedTime(currentTime) {
    currentTime = currentTime.trim().toLowerCase();

    const rxTime = /(\d+):(\d+)\s*(am|pm)?/;
    const timeParts = currentTime.match(rxTime);

    if (null === timeParts) {
      return null;
    }

    if (undefined !== timeParts[3]) {
      if (timeParts[1] === '12') {
        timeParts[1] = '0';
      }

      if (timeParts[3] === 'pm') {
        timeParts[1] = (parseInt(timeParts[1], 10) + 12).toString();
      }
    }

    currentTime = timeParts[1].padStart(2, '0') + ':' + timeParts[2].padStart(2, '0');

    return currentTime;
  }

  handleChangeTime(event) {
    this.setState({
      recordedTime: event.target.value
    });
  }

  updateTime(recordedTime) {
    this.setState({
      recordedTime: recordedTime
    });
  }

  updateTaskName(event) {
    this.setState({
      taskName: event.target.value
    });
  }

  recordTimeEntry(event) {
    event.preventDefault();

    let timeEntry = {
      recordedTime: this.formatRecordedTime(this.state.recordedTime),
      taskName: this.state.taskName.trim()
    };

    if (0 < timeEntry.taskName.length && null !== timeEntry.recordedTime) {
      this.props.recordTimeEntry(timeEntry);
    }

    this.resetForm();
  }

  resetForm() {
    this.setState({
      editMode: false,
      recordedTime: this.props.currentTime.format('h:mm a'),
      taskName: ''
    });
  }

  render() {
    return (
      <form className={ styles.EntryForm } onSubmit={ this.recordTimeEntry }>
        <div className={ styles.resetButton }>
          <button type="button" onClick={ this.resetForm }>
            <img src={ this.timeIcon } alt="Reset" />
          </button>
        </div>
        <div className={ styles.recordedTime }>
          <input
            type="text"
            value={ this.timeValue }
            onChange={ this.handleChangeTime }
            onFocus={ this.enterEditMode }
          />
        </div>
        <div className={ styles.taskName }>
          <input
            type="text"
            placeholder="What are you working on?"
            value={ this.state.taskName }
            onChange={ this.updateTaskName }
          />
        </div>
        <div className={ styles.startButton }>
          <button type="submit">Start</button>
        </div>
      </form>
    )
  }
}

EntryForm.propTypes = {
  currentTime: PropTypes.object.isRequired,
  recordTimeEntry: PropTypes.func.isRequired
}

export default EntryForm;
