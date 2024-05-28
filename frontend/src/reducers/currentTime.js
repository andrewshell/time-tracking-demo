function currentTime (state = [], action) {
  switch (action.type) {
    case 'SET_CURRENT_TIME':
      return action.time;
    default:
      return state;
  }
}

export default currentTime;
