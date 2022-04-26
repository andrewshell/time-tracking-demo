import { connect } from 'react-redux';
import { continueTask, deleteTime } from '../actions';
import TaskRow from '../components/TaskRow';

const mapStateToProps = (state, ownProps) => ({
  task: ownProps.task
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  continueTask: () => dispatch(continueTask(
    ownProps.task.taskName
  )),

  deleteTime: (task) => dispatch(deleteTime(
    task.recordedTime
  ))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskRow)
