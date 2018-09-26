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
      return 'img/md-arrow-dropdown.svg';
    }

    return 'img/md-arrow-dropright.svg';
  }

  toggleDetails() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  continueTask() {
    this.props.continueTask(this.props.task);
  }

  deleteTime(time) {
    this.props.deleteTime(time);
  }

  render() {
    return (
      <div className={ styles.TaskRow }>
        <div className={ styles.summary }>
          <div className={ styles.toggleButton }>
            <button type="button" onClick={ this.toggleDetails }>
              <img src={ this.arrowIcon } alt="Toggle" />
            </button>
          </div>
          <div className={ styles.duration }>
            <FormattedDuration duration={ this.props.task.duration }></FormattedDuration>
          </div>
          <div className={ styles.taskName }>
            { this.props.task.taskName }
          </div>
          <div className={ styles.continueButton }>
            <button type="button" onClick={ this.continueTask }>Continue</button>
          </div>
        </div>
        <div className={ this.state.expanded ? styles.details : styles.hidden }>
        {this.props.task.timeEntries.map((time, i) => {
          return (
            <TimeRow
              key={ time.recordedTime }
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
  task: PropTypes.object.isRequired,
  continueTask: PropTypes.func.isRequired,
  deleteTime: PropTypes.func.isRequired
}

export default TaskRow;
