import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TaskRowContainer from '../../containers/TaskRowContainer';
import styles from './TaskList.module.scss';

class TaskList extends Component {

  render() {
    return (
      <div className={ styles.TaskList }>
        <div className={ 0 === this.props.tasks.length ? styles.emptyState : styles.hidden }>
          There are no tasks recorded.
        </div>
        {this.props.tasks.map((task, i) => {
          return (
            <TaskRowContainer
              key={ task.taskName }
              task={ task }
            ></TaskRowContainer>
          )
        })}
      </div>
    )
  }

}

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired
}

export default TaskList;
