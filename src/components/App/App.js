import React, {Component} from 'react';
import EntryFormContainer from '../../containers/EntryFormContainer';
import TaskListContainer from '../../containers/TaskListContainer';
import styles from './App.module.scss';

class App extends Component {
  render() {
    return (
      <div className={ styles.App }>
        <EntryFormContainer></EntryFormContainer>
        <div className={ styles.taskBody }>
          <TaskListContainer></TaskListContainer>
        </div>
      </div>
    )
  }
}

export default App;
