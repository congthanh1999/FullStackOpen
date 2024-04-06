import { useState } from "react";

const Button = ({ text, feedback, setFeedback }) => {
  const handleSetState = () => {
    setFeedback(feedback + 1);
  };

  return (
    <button className="button" onClick={handleSetState}>
      {text}
    </button>
  );
};

const StatisticLine = ({ feedback, value }) => {
  return (
    <tr>
      <td>{feedback} </td>
      <td>
        {value} {feedback === "positive" ? "%" : ""}
      </td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + bad + neutral;
  const average = total === 0 ? 0 : (good - bad) / total;
  const positive = total === 0 ? 0 : (good / total) * 100;

  if (total === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <table>
      <tbody>
        <StatisticLine feedback={"good"} value={good} />
        <StatisticLine feedback={"neutral"} value={neutral} />
        <StatisticLine feedback={"bad"} value={bad} />
        <StatisticLine feedback={"total"} value={total} />
        <StatisticLine feedback={"average"} value={average} />
        <StatisticLine feedback={"positive"} value={positive} />
      </tbody>
    </table>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" feedback={good} setFeedback={setGood} />
      <Button text="neutral" feedback={neutral} setFeedback={setNeutral} />
      <Button text="bad" feedback={bad} setFeedback={setBad} />
      <h1>Statistic</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
