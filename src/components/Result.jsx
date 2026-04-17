export const Result = ({ correct, total, onRestart }) => {
  return (
    <div className="result">
      <img
        src="https://cdn-icons-png.flaticon.com/512/3050/3050196.png"
        alt="Результат"
      />
      <h2>Твой результат</h2>
      <p>
        Правильных ответов: {correct} из {total}
      </p>
      <button onClick={onRestart}>Пройти заново</button>
    </div>
  );
};
