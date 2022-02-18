import { useCallback, useEffect, useState } from "react";

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
function Calculator() {
  const numbers = elements.numbers.map((element) => element.text);
  const operators = elements.operators.map((element) => element.text);
  const isAdigit = (value) => numbers.includes(value);
  const isAnOperator = (value) => operators.includes(value);
  const isADot = (value) => value === ".";
  const isAnEqualSign = (value) => value === "=";
  const isAClearSign = (value) => value === "AC";
  const [display, setDisplay] = useState("0");
  const [temporaryInput, setTemporaryInput] = useState("");
  const handleClick = useCallback(
    (e) => {
      const text = e.target.innerText;
      if (isAdigit(text)) {
        setTemporaryInput((previous) => {
          if (previous === "0") {
            return text;
          }
          if (previous && isAnOperator(previous)) return text;
          if (previous) return previous + text;
          return text;
        });
        setDisplay((previous) => {
          if (previous === "0") return text;
          if (previous) return previous + text;
          return text;
        });
      } else if (isAnOperator(text)) {
        setTemporaryInput(text);
        setDisplay((previous) => {
          if (previous && isAnOperator(previous[previous.length - 1]))
            return previous.slice(0, previous.length - 1) + text;
          if (previous) return previous + text;
          return text;
        });
      } else if (isAClearSign(text)) {
        setTemporaryInput("");
        setDisplay("0");
      } else if (isAnEqualSign(text)) {
        setDisplay((previous) => {
          return previous + "=" + eval(previous);
        });
        setDisplay((previous) => {
          return previous + "=" + eval(previous);
        });
      }
    },
    [setTemporaryInput, setDisplay]
  );
  useEffect(() => {
    document.getElementsByClassName("calculator--button").forEach((element) => {
      element.addEventListener("click", handleClick);
    });
  });
  return (
    <>
      <h1 className="text-gradient-1 text--center">Calculator</h1>
      <section id="calculator">
        <div className="flex--colum" id="display-container">
          <div id="history">{display}</div>
          <div id="display">{temporaryInput}</div>
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
