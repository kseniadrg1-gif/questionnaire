import { useState, useEffect, useRef } from "react";

export const Game = ({ step, totalSteps, question, onClickVariant }) => {
  const percentage = Math.round(((step + 1) / totalSteps) * 100);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const timerRef = useRef(null);

  // Сбрасываем при смене вопроса
  useEffect(() => {
    setSelectedIndex(null);
    setShowResult(false);
    // Отменяем старый таймер, если он есть
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [step, question]);

  const handleClick = (index) => {
    if (showResult) return;

    setSelectedIndex(index);
    setShowResult(true);

    // Сохраняем таймер в ref, чтобы можно было отменить
    timerRef.current = setTimeout(() => {
      onClickVariant(index);
      timerRef.current = null;
    }, 1500);
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
            {showResult && index === question.correct && (
              <span className="checkmark"> ✓</span>
            )}
            {showResult &&
              index === selectedIndex &&
              index !== question.correct && <span className="cross"> ✗</span>}
          </li>
        ))}
      </ul>
    </>
  );
};
