export const initialState = {
  breakLength: 5,
  sessionLength: 25,
  timer: 25 * 60,
  isSession: true,
  isRunning: false,
};
const INCREMENT_BREAK_LENGTH = "INCREMENT_BREAK_LENGTH";
const DECREMENT_BREAK_LENGTH = "DECREMENT_BREAK_LENGTH";
const INCREMENT_SESSION_LENGTH = "INCREMENT_SESSION_LENGTH";
const DECREMENT_SESSION_LENGTH = "DECREMENT_SESSION_LENGTH";
const DECREMENT_TIMER = "DECREMENT_TIMER";
const RESET_EVERYTHING = "RESET_EVERYTHING";
const TOGGLE_SESSION_STATUS = "TOGGLE_SESSION_STATUS";
function pomodoReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_BREAK_LENGTH:
      if (state.breakLength < 60 && state.breakLength)
        return Object.assign({}, state, {
          breakLength: state.breakLength + 1,
          timer:
            (!state.isSession && (state.breakLength + 1) * 60) || state.timer,
        });
      return state;
    case DECREMENT_BREAK_LENGTH:
      if (state.breakLength > 1)
        return Object.assign({}, state, {
          breakLength: state.breakLength - 1,
          timer:
            (!state.isSession && (state.breakLength - 1) * 60) || state.timer,
        });
      return state;

    case INCREMENT_SESSION_LENGTH:
      if (state.sessionLength < 60)
        return Object.assign({}, state, {
          sessionLength: state.sessionLength + 1,
          timer:
            (state.isSession && (state.sessionLength + 1) * 60) || state.timer,
        });
      return state;
    case DECREMENT_SESSION_LENGTH:
      if (state.sessionLength > 1)
        return Object.assign({}, state, {
          sessionLength: state.sessionLength - 1,
          timer:
            (state.isSession && (state.sessionLength - 1) * 60) || state.timer,
        });
      return state;
    case DECREMENT_TIMER:
      if (state.timer > 0)
        return Object.assign({}, state, { timer: state.timer - 1 });
      else {
        return Object.assign({}, state, {
          timer: state.isSession
            ? state.breakLength * 60
            : state.sessionLength * 60,
          isSession: !state.isSession,
        });
      }

    case TOGGLE_SESSION_STATUS:
      return Object.assign({}, state, { isRunning: !state.isRunning });
    case RESET_EVERYTHING:
      return initialState;
    default:
      return state;
  }
}
export const incrementBreakLength = () => ({
  type: INCREMENT_BREAK_LENGTH,
});
export const decrementBreakLength = () => ({
  type: DECREMENT_BREAK_LENGTH,
});
export const incrementSessionLength = () => ({
  type: INCREMENT_SESSION_LENGTH,
});
export const decrementSessionLength = () => ({
  type: DECREMENT_SESSION_LENGTH,
});
export const decrementTimer = () => ({
  type: DECREMENT_TIMER,
});
export const toggleSessionStatus = () => ({
  type: TOGGLE_SESSION_STATUS,
});
export const resetEverything = () => ({
  type: RESET_EVERYTHING,
});

export const getMinutesAndSeconds = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes / 10 < 1 ? "0" + minutes : minutes}:${
    seconds / 10 < 1 ? "0" + seconds : seconds
  }`;
};
export default pomodoReducer;
