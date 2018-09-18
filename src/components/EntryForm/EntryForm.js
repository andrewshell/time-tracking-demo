import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TimeEntry from '../TimeEntry/TimeEntry';
import './EntryForm.css';

class EntryForm extends Component {
  state = {
    recordedTime: '',
    taskName: ''
  };

  constructor(props) {
    super(props);

    this.recordTimeEntry = this.recordTimeEntry.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.updateTaskName = this.updateTaskName.bind(this);

    this.timeEntryRef = React.createRef();
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

    if ('function' === typeof this.props.recordTimeEntry) {
      let timeEntry = Object.assign({}, this.state);
      timeEntry.taskName = timeEntry.taskName.trim();
      if (0 < timeEntry.taskName.length) {
        this.props.recordTimeEntry(timeEntry);
      }
    }

    this.timeEntryRef.current.resetForm();
    this.setState({
      taskName: ''
    });
  }

  render() {
    return (
      <form className="EntryForm" onSubmit={ this.recordTimeEntry }>
        <TimeEntry
          ref={ this.timeEntryRef }
          updateTime={ this.updateTime }
        ></TimeEntry>
        <input
          type="text"
          className="taskName"
          placeholder="What are you working on?"
          value={ this.state.taskName }
          onChange={ this.updateTaskName }
        />
        <button
          type="submit"
          className="startButton"
        >Start</button>
      </form>
    )
  }
}

TimeEntry.propTypes = {
  recordTimeEntry: PropTypes.func
}

export default EntryForm;
