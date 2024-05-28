import { combineReducers } from 'redux';
import currentTime from './currentTime';
import times from './times';

export default combineReducers({
  currentTime,
  times
});
