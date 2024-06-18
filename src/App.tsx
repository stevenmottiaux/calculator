import React, { useState } from 'react';
import './App.css'

function computeResult(str: string) {
  return Function("return " + str)();
}


function App() {
  const [display, setDisplay] = useState<string>('0');
  const [history, setHistory] = useState<string[]>([]);
  const handleButtonClick = (value: string) => {
    if (value === 'C') {
      setDisplay('0');
    }
    else if (value === '=') {
      try {
        const result = computeResult(display).toString();

        setDisplay(result);

        setHistory(prevHistory => {
          const newHistory = [`${display} = ${result}`, ...prevHistory];
          // Conserver seulement les 10 dernières opérations
          return newHistory.slice(0, 10);
        });

      }

      catch {
        setDisplay('Erreur');
      }
    }

    else {
      setDisplay(display === '0' ? value : display + value);

    }
  };

  return (
    <div className='main'>
      <div className='title'><h1>Ma calculatrice en TypeScript</h1></div>
      <div className='content'>
        <div className="calculator">
          <div className="display" id="display">{display}</div>
          <div className="buttons">
            <button className="button operator" onClick={() => handleButtonClick('C')}>C</button>
            <button className="button operator" onClick={() => handleButtonClick('±')}>±</button>
            <button className="button operator" onClick={() => handleButtonClick('%')}>%</button>
            <button className="button operator" onClick={() => handleButtonClick('/')}>/</button>

            <button className="button number" onClick={() => handleButtonClick('7')}>7</button>
            <button className="button number" onClick={() => handleButtonClick('8')}>8</button>
            <button className="button number" onClick={() => handleButtonClick('9')}>9</button>
            <button className="button operator" onClick={() => handleButtonClick('*')}>*</button>

            <button className="button number" onClick={() => handleButtonClick('4')}>4</button>
            <button className="button number" onClick={() => handleButtonClick('5')}>5</button>
            <button className="button number" onClick={() => handleButtonClick('6')}>6</button>
            <button className="button operator" onClick={() => handleButtonClick('-')}>-</button>

            <button className="button number" onClick={() => handleButtonClick('1')}>1</button>
            <button className="button number" onClick={() => handleButtonClick('2')}>2</button>
            <button className="button number" onClick={() => handleButtonClick('3')}>3</button>
            <button className="button operator" onClick={() => handleButtonClick('+')}>+</button>

            <button className="button number" onClick={() => handleButtonClick('0')}>0</button>
            <button className="button number" onClick={() => handleButtonClick('.')}>.</button>
            <button className="button equal" onClick={() => handleButtonClick('=')}>=</button>
          </div>
        </div>
        <div className='history'>
          <h2>Liste des 10 dernières opérations :</h2>
          <ul>
            {history.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
