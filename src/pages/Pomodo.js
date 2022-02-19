import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import pomodoReducer, {
  initialState,
  decrementBreakLength,
  decrementSessionLength,
  decrementTimer,
  getMinutesAndSeconds,
  incrementBreakLength,
  incrementSessionLength,
  toggleSessionStatus,
  resetEverything,
} from "../Reducers/pomodoReducer";

function Pomodo() {
  const [pomodo, dispatch] = useReducer(pomodoReducer, initialState);
  const [intervalFunctionId, setIntervalFunctionId] = useState(null);
  const [
    decrBreakLen,
    decrSessionLen,
    decrTimer,
    incrBreakLen,
    incrSessionLen,
    toggleStatus,
    reset,
  ] = [
    decrementBreakLength,
    decrementSessionLength,
    decrementTimer,
    incrementBreakLength,
    incrementSessionLength,
    toggleSessionStatus,
    resetEverything,
  ].map((action) => () => dispatch(action()));
  const resetAll = useCallback(() => {
    console.log(intervalFunctionId);
    audioElement.current.pause();
    audioElement.current.currentTime = 0;
    if (pomodo.isRunning) {
      clearInterval(intervalFunctionId);
      setIntervalFunctionId(null);
      toggleStatus();
    }

    reset();
  }, [setIntervalFunctionId, intervalFunctionId, toggleStatus, reset, pomodo]);
  const audioElement = useRef();
  const toggleTime = useCallback(() => {
    if (!intervalFunctionId) {
      let timeInterval = setInterval(decrTimer, 10);
      setIntervalFunctionId(timeInterval);
    } else {
      clearInterval(intervalFunctionId);
      setIntervalFunctionId(null);
    }
    toggleStatus();
  }, [decrTimer, setIntervalFunctionId, intervalFunctionId, toggleStatus]);
  useEffect(() => {
    pomodo.timer === 0 && audioElement.current.play();
  }, [pomodo]);
  return (
    <div className="flex--column" id="pomodo">
      <h1 className="text-gradient-1 text--center"> 25 + 5 Clock</h1>
      <div className="flex--row">
        <div className="flex--column w-6 flex-center">
          <h2 className="text--center" id="break-label">
            Break Length
          </h2>
          <div className="flex--row flex--center">
            <button
              className="button--styled m-4"
              onClick={decrBreakLen}
              id="break-decrement"
              disabled={pomodo.isRunning}
            >
              -
            </button>
            <p id="break-length">{pomodo.breakLength}</p>
            <button
              className="button--styled m-4"
              onClick={incrBreakLen}
              id="break-increment"
              disabled={pomodo.isRunning}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex--column w-6">
          <h2 className="text--center" id="session-label">
            Session Length
          </h2>
          <div className="flex--row flex--center">
            <button
              className="button--styled m-4"
              onClick={decrSessionLen}
              id="session-decrement"
              disabled={pomodo.isRunning}
            >
              -
            </button>
            <p id="session-length">{pomodo.sessionLength}</p>
            <button
              className="button--styled m-4"
              onClick={incrSessionLen}
              id="session-increment"
              disabled={pomodo.isRunning}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="text--center">
        <h1 id="timer-label"> {pomodo.isSession ? "Session" : "Break"}</h1>
        <h1 id="time-left"> {getMinutesAndSeconds(pomodo.timer)}</h1>
      </div>
      <div className="flex--row flex--center">
        <button
          className="button--styled m-4 m-4"
          onClick={toggleTime}
          id="start_stop"
        >
          start_stop
        </button>
        <button
          className="button--styled m-4 m-4"
          onClick={resetAll}
          id="reset"
        >
          Reset
        </button>
      </div>

      <audio id="beep" src="/beep.wav" ref={audioElement}></audio>
    </div>
  );
}

export default Pomodo;
