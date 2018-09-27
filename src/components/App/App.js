import React, {Component} from 'react';
import EntryFormContainer from '../../containers/EntryFormContainer';
import TaskListContainer from '../../containers/TaskListContainer';
// import styles from './App.module.scss';
import styles from './App.module.css';

class App extends Component {

  render() {
    console.dir(styles);
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
