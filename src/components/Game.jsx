import { useState } from "react";

export const Game = ({ step, totalSteps, question, onClickVariant }) => {
  const percentage = Math.round(((step + 1) / totalSteps) * 100);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleClick = (index) => {
    if (answered) return;
    setAnswered(true);
    setSelected(index);

    setTimeout(() => {
      onClickVariant(index);
    }, 800);
  };

  const getClass = (index) => {
    if (!answered) return "";
    if (index === question.correct) return "correct";
    if (index === selected && index !== question.correct) return "wrong";
    return "";
  };

  return (
    <>
      <div className="progress">
        <div
          style={{ width: `${percentage}%` }}
          className="progress__inner"
        ></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {question.variants.map((text, index) => (
          <li
            key={index}
            onClick={() => handleClick(index)}
            className={getClass(index)}
          >
            {text}
            {answered && index === question.correct && <span> ✓</span>}
            {answered && index === selected && index !== question.correct && (
              <span> ✗</span>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};
