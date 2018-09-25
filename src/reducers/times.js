import * as moment from 'moment';

const tasks = (state = [], action) => {
  let i;

  switch (action.type) {
    case 'PUT_TIME':
      i = state.findIndex((timeEntry) => {
        return action.recordedTime === timeEntry.recordedTime;
      });

      let newState;

      if (-1 === i) {
        newState = state;
      } else {
        newState = [
          ...state.slice(0, i),
          ...state.slice(i + 1)
        ];
      }

      return [
        ...newState,
        {
          id: action.id,
          recordedTime: action.recordedTime,
          taskName: action.taskName
        }
      ]
      .sort(reorderState)
      .map(recalculateDurations);
    case 'DELETE_TIME':
      i = state.findIndex((timeEntry) => {
        return action.recordedTime === timeEntry.recordedTime;
      });

      if (-1 === i) {
        return state;
      }

      return [
        ...state.slice(0, i),
        ...state.slice(i + 1)
      ].map(recalculateDurations);
    case 'SET_CURRENT_TIME':
      if (0 === state.length) {
        return state;
      }

      let latest = Object.assign({}, state[0]);
      latest.duration = action.time.diff(
        action.time.format('YYYY-MM-DD ') + latest.recordedTime + ':00',
        'minutes'
      );

      return [
        latest,
        ...state.slice(1)
      ];
    default:
      return state
  }
};

const reorderState = (a, b) => {
  return b.recordedTime.localeCompare(a.recordedTime);
};

const recalculateDurations = (currentTime, index, state) => {
  let today = moment().format('YYYY-MM-DD ');
  let nextTime = null;

  if (undefined === state[index - 1]) {
    nextTime = moment().startOf('minute').format('HH:mm');
  } else {
    nextTime = state[index - 1].recordedTime;
  }

  let duration = Math.max(0, parseInt(
    moment(today + nextTime + ':00')
      .diff(today + currentTime.recordedTime + ':00', 'minutes'),
    10
  ));

  if (currentTime.duration === duration) {
    return currentTime;
  }

  return Object.assign({}, currentTime, {
    duration: duration
  });
};

export default tasks
