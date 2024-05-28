import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import { setCurrentTime } from './actions';
import rootReducer from './reducers';
import dayjs from 'dayjs';

const store = createStore(rootReducer);

const timeoutSeconds = 60 - parseInt(dayjs().format('s'), 10);
const updateCurrentTime = () => {
  store.dispatch(setCurrentTime(dayjs().startOf('minute')));
};

updateCurrentTime();

// First update duration at next minute change
setTimeout(() => {
  updateCurrentTime();

  setInterval(updateCurrentTime, 60000);
}, timeoutSeconds * 1000);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
