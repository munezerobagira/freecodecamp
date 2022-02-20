const elements = {
  numbers: [
    { text: "1", id: "one" },
    { text: "2", id: "two" },
    { text: "3", id: "three" },
    { text: "4", id: "four" },
    { text: "5", id: "five" },
    { text: "6", id: "six" },
    { text: "7", id: "seven" },
    { text: "8", id: "eight" },
    { text: "9", id: "nine" },
    { text: "0", id: "zero" },
  ],
  operators: [
    { text: "+", id: "add" },
    { text: "-", id: "subtract" },
    { text: "*", id: "multiply" },
    { text: "/", id: "divide" },
  ],
};

// TODO:a function to calculate the result of mathematical expression without using eval()

const ADD_INPUT = "ADD_INPUT";
const CLEAR_INPUT = "CLEAR_INPUT";
const GET_RESULT = "GET_RESULT";
const numbers = elements.numbers.map((element) => element.text);
const operators = elements.operators.map((element) => element.text);
export const isAdigit = (value) => numbers.includes(value);
export const isAnOperator = (value) => operators.includes(value);
export const isADot = (value) => value === ".";
export const isAnEqualSign = (value) => value === "=";
export const isAClearSign = (value) => value === "AC";

//Below code,Need refactor
export const initialState = { elements, display: "0", history: "" };
export default function calculatorReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_INPUT:
      const { display, history } = state;
      const { input } = action;
      if (display === "0" && history === "") {
        if (
          isAdigit(input) ||
          (isAnOperator(input) && ["+", "-"].includes(input))
        )
          return Object.assign({}, state, { display: input, history: input });
        if (isADot(input))
          return Object.assign({}, state, { display: "0.", history: "0." });
        return state;
      } else if (display !== "0" && !history.includes("=")) {
        if (isAdigit(input)) {
          if (isAnOperator(display[display.length - 1]))
            return Object.assign({}, state, {
              display: input,
              history: history + input,
            });

          return Object.assign({}, state, {
            display: display + input,
            history: history + input,
          });
        } else if (isAnOperator(input)) {
          // Allow the positive sign and negative sign to be added to the a number

          if (
            (isAnOperator(history[history.length - 1]) &&
              !isAnOperator(history[history.length - 2]) &&
              ["+", "-"].includes(input) &&
              history[history.length - 1] !== input) ||
            isAdigit(history[history.length - 1])
          )
            return Object.assign({}, state, {
              display: input,
              history: history + input,
            });
          else if (
            isAnOperator(history[history.length - 1]) &&
            isAnOperator(history[history.length - 2]) &&
            isAdigit(history[history.length - 3])
          )
            return Object.assign({}, state, {
              display: input,
              history: history.slice(0, history.length - 2) + input,
            });
        } else if (isADot(input) && !display.includes(".")) {
          return Object.assign({}, state, {
            display: state.display + input,
            history: history + input,
          });
        }
        return state;
      } else if (display && history.includes("=")) {
        if (isAdigit(input))
          return Object.assign({}, state, { display: input, history: input });
        else if (isAnOperator(input))
          return Object.assign({}, state, {
            display: input,
            history: history.split("=")[1] + input,
          });
        if (isADot(input))
          return Object.assign({}, state, {
            display: "0.",
            history: "0.",
          });
        return state;
      } else if (display === "0" && history !== "") {
        if (isAdigit(input) && isAnOperator(history[history.length - 1])) {
          return Object.assign({}, state, {
            display: input,
            history: history + input,
          });
        }
        if (isADot(input))
          return Object.assign({}, state, { display: "0.", history: "0." });
        if (isAnOperator(input) && ["+", "-"].includes(input))
          return Object.assign({}, state, {
            display: input,
            history: history + input,
          });
        return state;
      }
      return state;
    case CLEAR_INPUT:
      return Object.assign({}, state, { display: "0", history: "" });
    case GET_RESULT:
      // eslint-disable-next-line
      const calculateResultFunction = Function("", `return ${state.history}`);
      return Object.assign({}, state, {
        display: calculateResultFunction(),
        history: state.history + "=" + calculateResultFunction(),
      });
    default:
      return state;
  }
}
export const addInput = (input) => {
  return { type: ADD_INPUT, input };
};
export const clearInput = () => {
  return { type: CLEAR_INPUT };
};
export const getResult = () => {
  return { type: GET_RESULT };
};
