import dayjs from 'dayjs';

function tasks (state = [], action) {
  let i, newState, latest;

  switch (action.type) {
    case 'PUT_TIME':
      i = state.findIndex((timeEntry) => {
        return action.recordedTime === timeEntry.recordedTime;
      });

      if (i === -1) {
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

      if (i === -1) {
        return state;
      }

      return [
        ...state.slice(0, i),
        ...state.slice(i + 1)
      ].map(recalculateDurations);
    case 'SET_CURRENT_TIME':
      if (state.length === 0) {
        return state;
      }

      latest = Object.assign({}, state[0]);
      latest.duration = action.time.diff(
        action.time.format('YYYY-MM-DD ') + latest.recordedTime + ':00',
        'minutes'
      );

      return [
        latest,
        ...state.slice(1)
      ];
    default:
      return state;
  }
}

function reorderState (a, b) {
  return b.recordedTime.localeCompare(a.recordedTime);
}

function recalculateDurations (currentTime, index, state) {
  const today = dayjs().format('YYYY-MM-DD ');
  let nextTime = null;

  if (undefined === state[index - 1]) {
    nextTime = dayjs().startOf('minute').format('HH:mm');
  } else {
    nextTime = state[index - 1].recordedTime;
  }

  const duration = Math.max(0, parseInt(
    dayjs(today + nextTime + ':00')
      .diff(today + currentTime.recordedTime + ':00', 'minutes'),
    10
  ));

  if (currentTime.duration === duration) {
    return currentTime;
  }

  return Object.assign({}, currentTime, {
    duration
  });
}

export default tasks;
