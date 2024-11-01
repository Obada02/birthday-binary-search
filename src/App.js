import React, { useState } from 'react';
import { dayNumberToDate, formatDate } from './utils/dateConversion';
import './App.css';
import FlipCounter from "./components /FlipCounter";

function App() {
  const [low, setLow] = useState(null);
  const [high, setHigh] = useState(null);
  const [guess, setGuess] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState('');
  const [completed, setCompleted] = useState(false);


  const handleStart = () => {
    setLow(1);
    setHigh(365);
    setGuess(null);
    setAttempts(10);
    setMessage('');
    setCompleted(false);
    setTimeout(() => makeGuess(1, 365), 500);
  };

  const makeGuess = (currentLow, currentHigh) => {
    if (currentLow > currentHigh) {
      setMessage("Error: Inconsistent answers. Please restart.");
      setCompleted(true);
      return;
    }
    const mid = Math.floor((currentLow + currentHigh) / 2);
    setGuess(mid);
    setLow(currentLow);
    setHigh(currentHigh);
  };

  const handleResponse = (response) => {
    let newLow = low;
    let newHigh = high;

    if (response === 'before') {
      newHigh = guess - 1;
    } else if (response === 'after') {
      newLow = guess + 1;
    } else if (response === 'correct') {
      setMessage(`🎉 Your birthday is ${formatDate(dayNumberToDate(guess))}! with remaining ${attempts} attempts.`);
      setCompleted(true);
      return;
    }

    setAttempts(prev => prev - 1);

    if (newLow > newHigh) {
      setMessage("❌ Error: Inconsistent answers. Please restart.");
      setCompleted(true);
      return;
    }

    setLow(newLow);
    setHigh(newHigh);
    makeGuess(newLow, newHigh);
  };

  return (
      <div className="container">
        <FlipCounter value={attempts} maxDigits={2} />

        <h1>🎂 Birthday Search 🎂</h1>
        {!guess && !completed && (
            <button className="start-button" onClick={handleStart}>
              Start Guessing
            </button>
        )}

        {guess && !completed && (
            <div className="guess-section">
              <p>
                Is your birthday before, after, or on <strong>{formatDate(dayNumberToDate(guess))}</strong>?
              </p>
              <div className="button-group">
                <button onClick={() => handleResponse('before')}>Before</button>
                <button onClick={() => handleResponse('correct')}>Correct</button>
                <button onClick={() => handleResponse('after')}>After</button>
              </div>
              <div className="info">
                <p>Remaining attempts: {attempts}</p>
                <p>
                  Current Range: {formatDate(dayNumberToDate(low))} to {formatDate(dayNumberToDate(high))}
                </p>
              </div>
            </div>
        )}

        {completed && (
            <div className="result-section">
              <p>{message}</p>
              <button className="restart-button" onClick={handleStart}>
                Restart
              </button>
            </div>
        )}
      </div>
  );
}

export default App;
