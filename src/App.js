import React, { useEffect, useRef, useState } from "react";
import ProgressBar from "./components/ProgressBar";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [currentProblem, setCurrentProblem] = useState(generateProblem());
  const [userAnswer, setUserAnswer] = useState("");
  const [showError, setShowError] = useState(false);
  const answerField = useRef(null);
  const resetButton = useRef(null);

  useEffect(() => {
    if (score === 10 || mistakes === 3) {
      setTimeout(() => {
        resetButton.current.focus();
      }, 331);
    }
  }, [score, mistakes]);

  function generateNumber(max) {
    return Math.floor(Math.random() * (max + 1));
  }

  function generateProblem() {
    return {
      firstNumber: generateNumber(10),
      secondNumber: generateNumber(10),
      operator: ["+", "-", "x"][generateNumber(2)],
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    answerField.current.focus();

    let correctAnswer;
    if (currentProblem.operator === "+")
      correctAnswer = currentProblem.firstNumber + currentProblem.secondNumber;
    if (currentProblem.operator === "-")
      correctAnswer = currentProblem.firstNumber - currentProblem.secondNumber;
    if (currentProblem.operator === "x")
      correctAnswer = currentProblem.firstNumber * currentProblem.secondNumber;

    if (correctAnswer === parseInt(userAnswer, 10)) {
      setScore((previousValue) => previousValue + 1);
      setCurrentProblem(generateProblem());
      setUserAnswer("");
    } else {
      setMistakes((previousValue) => previousValue + 1);
      setShowError(true);
      setUserAnswer("");
      setTimeout(() => setShowError(false), 420);
    }
  }

  function resetGame() {
    setScore(0);
    setMistakes(0);
    setUserAnswer("");
    setCurrentProblem(generateProblem());
    answerField.current.focus();
  }

  return (
    <>
      <div
        className={
          "main-userInterface" +
          (mistakes === 3 || score === 10 ? " blurred" : "")
        }
      >
        <p className={"problem" + (showError ? " animate-wrongAnswer" : "")}>
          {currentProblem.firstNumber} {currentProblem.operator}{" "}
          {currentProblem.secondNumber}
        </p>

        <form action="" className="our-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="our-field"
            autoComplete="off"
            onChange={(e) => {
              setUserAnswer(e.target.value);
            }}
            value={userAnswer}
            ref={answerField}
          />
          <button>Submit</button>
        </form>

        <p className="rank">
          You need {10 - score} more points, and you are allowed to make{" "}
          {2 - mistakes} more mistakes.
        </p>
        <ProgressBar score={score} />
      </div>

      <div
        className={
          "overlay" +
          (mistakes === 3 || score === 10 ? " overlay--visible" : "")
        }
      >
        <div className="overlay-inner">
          <p className="end-message">
            {score === 10
              ? "Bravo! You won! Congrats!"
              : "Sorry! You lost. But you can try again!"}
          </p>
          <button
            className="reset-button"
            onClick={resetGame}
            ref={resetButton}
          >
            Start Over
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
