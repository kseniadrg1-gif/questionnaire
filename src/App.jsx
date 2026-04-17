import React from "react";
import "./App.scss";
import { Questions } from "./components/Questions";
import { Game } from "./components/Game";
import { Result } from "./components/Result";

function App() {
  const [step, setStep] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);
  const [finished, setFinished] = React.useState(false);

  const question = Questions[step];

  const onClickVariant = (index) => {
    if (index === question.correct) {
      setCorrect(correct + 1);
    }

    if (step + 1 < Questions.length) {
      setStep(step + 1);
    } else {
      setFinished(true);
    }
  };

  const onRestart = () => {
    setStep(0);
    setCorrect(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="App">
        <Result
          correct={correct}
          total={Questions.length}
          onRestart={onRestart}
        />
      </div>
    );
  }

  return (
    <div className="App">
      <Game
        step={step}
        totalSteps={Questions.length}
        question={question}
        onClickVariant={onClickVariant}
      />
    </div>
  );
}

export default App;
