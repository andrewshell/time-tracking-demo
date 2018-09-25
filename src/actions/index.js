import * as moment from 'moment';

let nextTimeId = 0

export const putTime = (recordedTime, taskName) => ({
  type: 'PUT_TIME',
  id: nextTimeId++,
  recordedTime: recordedTime,
  taskName: taskName
});

export const deleteTime = (recordedTime) => ({
  type: 'DELETE_TIME',
  recordedTime: recordedTime
});

export const continueTask = (taskName) => {
  return putTime(
    moment().format('HH:mm'),
    taskName
  );
};

export const setCurrentTime = (time) => ({
  type: 'SET_CURRENT_TIME',
  time: time
});
