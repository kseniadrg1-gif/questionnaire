import React from "react";
import "./App.scss";
import { Questions } from "./components/Questions";
import { Game } from "./components/Game";
import { Result } from "./components/Result";

function App() {
  const [step, setStep] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);
  const [finished, setFinished] = React.useState(false);
  const [resetKey, setResetKey] = React.useState(0);

  const question = Questions[step];

  const onClickVariant = (index) => {
    if (index === question.correct) {
      setCorrect(correct + 1);
    }

    if (step + 1 < Questions.length) {
      setStep(step + 1);
      setResetKey(resetKey + 1); // Меняем ключ = полный сброс Game
    } else {
      setFinished(true);
    }
  };

  const onRestart = () => {
    setStep(0);
    setCorrect(0);
    setFinished(false);
    setResetKey(0);
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
        key={resetKey}
        step={step}
        totalSteps={Questions.length}
        question={question}
        onClickVariant={onClickVariant}
      />
    </div>
  );
}

export default App;
