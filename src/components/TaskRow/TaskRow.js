import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FormattedDuration from '../FormattedDuration/FormattedDuration';
import TimeRow from '../TimeRow/TimeRow';
import styles from './TaskRow.module.scss';

class TaskRow extends Component {
  state = {
    expanded: false
  };

  constructor(props) {
    super(props);

    this.continueTask = this.continueTask.bind(this);
    this.deleteTime = this.deleteTime.bind(this);
    this.toggleDetails = this.toggleDetails.bind(this);
  }

  get arrowIcon() {
    if (this.state.expanded) {
      return 'arrow-dropdown';
    }

    return 'arrow-dropright';
  }

  toggleDetails() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  continueTask() {
    if ('function' === typeof this.props.continueTask) {
      this.props.continueTask(this.props.task);
    }
  }

  deleteTime(time) {
    if ('function' === typeof this.props.deleteTime) {
      this.props.deleteTime(time);
    }
  }

  render() {
    return (
      <div className={ styles.TaskRow }>
        <div className={ styles.summary }>
          <div className={ styles.leftMargin }>
            <ion-icon name={ this.arrowIcon } onClick={ this.toggleDetails }></ion-icon>
            <div className={ styles.duration }>
              <FormattedDuration duration={ this.props.task.duration }></FormattedDuration>
            </div>
          </div>
          <div className={ styles.taskName }>
            { this.props.task.taskName }
          </div>
          <button
            className={ styles.continueButton }
            onClick={ this.continueTask }
          >Continue</button>
        </div>
        <div className={ this.state.expanded ? 'details' : 'hidden' }>
        {this.props.task.timeEntries.map((time, i) => {
          return (
            <TimeRow
              key={ 'timeRow' + i }
              time={ time }
              deleteTime={ this.deleteTime }
            ></TimeRow>
          )
        })}
        </div>
      </div>
    )
  }
}

TaskRow.propTypes = {
    task: PropTypes.object,
    continueTask: PropTypes.func,
    deleteTime: PropTypes.func
}

export default TaskRow;
