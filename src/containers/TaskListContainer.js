import { connect } from 'react-redux'
import TaskList from '../components/TaskList/TaskList'

const mapStateToProps = (state, ownProps) => ({
  tasks: recordedTasks(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

const recordedTasks = (state) => {
  let taskIndex = state.times.reduce((taskIndex, timeEntry) => {
    if (undefined === taskIndex[timeEntry.taskName]) {
      taskIndex[timeEntry.taskName] = {
        taskName: timeEntry.taskName,
        recordedTime: timeEntry.recordedTime,
        duration: 0,
        timeEntries: []
      };
    }

    taskIndex[timeEntry.taskName].recordedTime = timeEntry.recordedTime;
    taskIndex[timeEntry.taskName].duration += timeEntry.duration;
    taskIndex[timeEntry.taskName].timeEntries.unshift(timeEntry);

    return taskIndex;
  }, {});

  return Object.values(taskIndex).sort((a, b) => {
    return b.recordedTime.localeCompare(a.recordedTime);
  });
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList)
