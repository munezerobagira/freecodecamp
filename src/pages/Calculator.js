import { useCallback, useEffect, useReducer } from "react";
import calculatorReducer, {
  isAClearSign,
  isADot,
  isAdigit,
  isAnEqualSign,
  isAnOperator,
  addInput,
  clearInput,
  getResult,
  initialState,
} from "../Reducers/calcutatorReducer";

function Calculator() {
  const [calculator, dispatch] = useReducer(calculatorReducer, initialState);
  const { elements } = calculator;
  const handleClick = useCallback(
    (e) => {
      const text = e.target.innerText;
      if (isAdigit(text) || isAnOperator(text) || isADot(text)) {
        dispatch(addInput(text));
      } else if (isAClearSign(text)) {
        dispatch(clearInput());
      } else if (isAnEqualSign(text)) {
        dispatch(getResult());
      }
    },
    [dispatch]
  );
  useEffect(() => {
    document.getElementsByClassName("calculator--button").forEach((element) => {
      element.removeEventListener("click", handleClick);
    });
    document.getElementsByClassName("calculator--button").forEach((element) => {
      element.addEventListener("click", handleClick);
    });
  }, [handleClick]);
  return (
    <>
      <h1 className="text-gradient-1 text--center">Calculator</h1>
      <section id="calculator">
        <div className="flex--colum" id="display-container">
          <div id="history">{calculator.history}</div>
          <div id="display">{calculator.display}</div>
        </div>
        <div className="flex--row flex--center">
          <button className="w-12 calculator--button" id="clear">
            <span className="w-12">AC</span>
          </button>
        </div>
        <div className="flex--row w-12">
          <div className="calculator_numbers w-8">
            {elements.numbers.map((number) => {
              return (
                <button
                  className={`${
                    number.text === "0" ? "w-6" : "w-4"
                  } calculator--button`}
                  id={number.id}
                  key={number.id}
                >
                  <span className="w-12">{number.text}</span>
                </button>
              );
            })}
            <button className="w-6  calculator--button" id="decimal">
              <span className="w-12">.</span>
            </button>
          </div>
          <div className="calculator_operators w-4">
            {elements.operators.map((operator) => {
              return (
                <button
                  className={`w-12  calculator--button`}
                  id={operator.id}
                  key={operator.id}
                >
                  <span className="w-12">{operator.text}</span>
                </button>
              );
            })}
          </div>
        </div>
        <button className="w-12  calculator--button" id="equals" key="equals">
          <span className="w-12">=</span>
        </button>
      </section>
    </>
  );
}

export default Calculator;
