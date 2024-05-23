import dayjs from 'dayjs';

export const putTime = (recordedTime, taskName) => ({
  type: 'PUT_TIME',
  recordedTime: recordedTime,
  taskName: taskName
});

export const deleteTime = (recordedTime) => ({
  type: 'DELETE_TIME',
  recordedTime: recordedTime
});

export const continueTask = (taskName) => {
  return putTime(
    dayjs().format('HH:mm'),
    taskName
  );
};

export const setCurrentTime = (time) => ({
  type: 'SET_CURRENT_TIME',
  time: time
});
