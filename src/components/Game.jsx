import { useState, useEffect } from "react";

export const Game = ({ step, totalSteps, question, onClickVariant }) => {
  const percentage = Math.round(((step + 1) / totalSteps) * 100);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // 🔥 ЭТО СБРАСЫВАЕТ ПОДСВЕТКУ ПРИ СМЕНЕ ВОПРОСА 🔥
  useEffect(() => {
    setSelectedIndex(null);
    setShowResult(false);
  }, [step]);

  const handleClick = (index) => {
    if (showResult) return;

    setSelectedIndex(index);
    setShowResult(true);

    setTimeout(() => {
      onClickVariant(index);
    }, 1000);
  };

  const getItemClass = (index) => {
    if (!showResult) return "";
    if (index === question.correct) return "correct";
    if (index === selectedIndex && index !== question.correct) return "wrong";
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
            className={getItemClass(index)}
          >
            {text}
            {showResult && index === question.correct && <span> ✓</span>}
            {showResult &&
              index === selectedIndex &&
              index !== question.correct && <span> ✗</span>}
          </li>
        ))}
      </ul>
    </>
  );
};
