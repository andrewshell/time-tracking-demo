import React from 'react';
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App/App';
import { setCurrentTime } from './actions';
import rootReducer from './reducers'
import * as moment from 'moment';

const store = createStore(rootReducer)

const timeoutSeconds = 60 - parseInt(moment().format('s'), 10);
const updateCurrentTime = () => {
  store.dispatch(setCurrentTime(moment().startOf('minute')));
};

updateCurrentTime();

// First update duration at next minute change
setTimeout(() => {
  updateCurrentTime();

  setInterval(updateCurrentTime, 60000);
}, timeoutSeconds * 1000);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
