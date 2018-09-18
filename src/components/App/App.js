import React, {Component} from 'react';
import EntryForm from '../EntryForm/EntryForm';
import TaskRow from '../TaskRow/TaskRow';
import './App.css';
import * as moment from 'moment';

class App extends Component {
  state = {
    recordedTimes: []
  };

  constructor(props) {
    super(props);

    const timeoutSeconds = 60 - parseInt(moment().format('s'), 10);

    // First update duration at next minute change
    setTimeout(this.initDuration.bind(this), timeoutSeconds * 1000);

    this.continueTask = this.continueTask.bind(this);
    this.deleteTime = this.deleteTime.bind(this);
    this.recordedTasks = this.recordedTasks.bind(this);
    this.recordTimeEntry = this.recordTimeEntry.bind(this);
  }

  initDuration() {
    this.updateCurrentDuration();

    // Then update every minute
    setInterval(this.updateCurrentDuration.bind(this), 60000);
  }

  updateCurrentDuration() {
    const currentTime = moment().startOf('minute');

    if (0 === this.state.recordedTimes.length) {
      return;
    }

    let recordedTimes = this.state.recordedTimes.slice(0);
    let currentRecord = recordedTimes[recordedTimes.length - 1];
    currentRecord.duration = currentTime.diff(
      currentTime.format('YYYY-MM-DD ') + currentRecord.recordedTime + ':00',
      'minutes'
    );

    this.setState({
      recordedTimes: recordedTimes
    });
  }

  recordedTasks() {
    let recordedTasksIndex = this.state.recordedTimes.reduce((recordedTasksIndex, timeEntry) => {
      if (undefined === recordedTasksIndex[timeEntry.taskName]) {
        recordedTasksIndex[timeEntry.taskName] = {
          taskName: timeEntry.taskName,
          recordedTime: timeEntry.recordedTime,
          duration: 0,
          timeEntries: []
        };
      }

      recordedTasksIndex[timeEntry.taskName].recordedTime = timeEntry.recordedTime;
      recordedTasksIndex[timeEntry.taskName].duration += timeEntry.duration;
      recordedTasksIndex[timeEntry.taskName].timeEntries.unshift(timeEntry);

      return recordedTasksIndex;
    }, {});

    return Object.values(recordedTasksIndex).sort((a, b) => {
      return b.recordedTime.localeCompare(a.recordedTime);
    });
  }

  recordTimeEntry(timeEntry) {
    timeEntry.id = moment().format('x'); // Good enough for a demo

    let recordedTimes = [
      ...this.state.recordedTimes.slice(0),
      timeEntry
    ].sort((a, b) => {
      return a.recordedTime.localeCompare(b.recordedTime);
    }).map(this.recalculateDurations);

    this.setState({
      recordedTimes: recordedTimes
    });
  }

  continueTask(task) {
    const timeEntry = {
      recordedTime: moment().format('HH:mm'),
      taskName: task.taskName
    }

    this.recordTimeEntry(timeEntry);
  }

  deleteTime(time) {
    let recordedTimes = this.state.recordedTimes.slice(0);
    let i = recordedTimes.findIndex((timeEntry) => {
      return time.id === timeEntry.id;
    });

    if (-1 < i) {
      recordedTimes = [
        ...recordedTimes.slice(0, i),
        ...recordedTimes.slice(i + 1)
      ].map(this.recalculateDurations);
    }

    this.setState({
      recordedTimes: recordedTimes
    });
  }

  recalculateDurations(currentTime, index, recordedTimes) {
    let today = moment().format('YYYY-MM-DD ');
    let nextTime = null;
    currentTime.duration = 0;

    if (undefined === recordedTimes[index + 1]) {
      nextTime = moment().startOf('minute').format('HH:mm');
    } else {
      nextTime = recordedTimes[index + 1].recordedTime;
    }

    currentTime.duration = parseInt(moment(today + nextTime + ':00')
      .diff(today + currentTime.recordedTime + ':00', 'minutes'), 10);

    return currentTime;
  }

  render() {
    return (
      <div className="App">
        <div className="taskHeader">
          <EntryForm
            recordTimeEntry={ this.recordTimeEntry }
          ></EntryForm>
        </div>
        <div className={ 0 === this.state.recordedTimes.length ? 'emptyState' : 'hidden' }>
          There are no recorded tasks.
        </div>
        <div className={ 0 === this.state.recordedTimes.length ? 'hidden' : 'taskBody' }>
          {this.recordedTasks().map((task, i) => {
            return (
              <TaskRow
                key={ 'taskRow' + i }
                task={ task }
                continueTask={ this.continueTask }
                deleteTime={ this.deleteTime }
              ></TaskRow>
            )
          })}

        </div>
      </div>
    )
  }
}

export default App;
