import PropTypes from 'prop-types';
import TaskRowContainer from '../containers/TaskRowContainer';
import styles from './TaskList.module.css';

function TaskList({ tasks }) {
  return (
    <div className={ styles.TaskList }>
      <div className={ 0 === tasks.length ? styles.emptyState : styles.hidden }>
        There are no tasks recorded.
      </div>
      {tasks.map((task, i) => {
        return (
          <TaskRowContainer
            key={ task.taskName }
            task={ task }
          ></TaskRowContainer>
        )
      })}
    </div>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired
}

export default TaskList;
