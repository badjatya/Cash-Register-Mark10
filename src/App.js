import React, { useState } from "react";
import "./App.css";

const App = () => {
  //State
  const [billAmount, setBillAmount] = useState();
  const [cashPaid, setCashPaid] = useState();
  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [notesReturn, setNotesReturn] = useState();
  const notesAccepted = [2000, 500, 200, 100, 50, 20, 10, 5, 1];

  function cashRegister(notesAccepted, billAmount, cashPaid) {
    const cashToReturn = cashPaid - billAmount;
    const notes = {};
    let bill = cashToReturn;

    for (let i = 0; i < notesAccepted.length; i++) {
      if (bill % notesAccepted[i] === billAmount) {
        notes[notesAccepted[i]] = 0;
      } else {
        notes[notesAccepted[i]] = Math.floor(bill / notesAccepted[i]);
        bill = bill % notesAccepted[i];
      }
    }
    return notes;
  }

  const submitEventHandler = () => {
    if (Number(cashPaid) < Number(billAmount)) {
      setMessage(`Cash paid less, please pay ${billAmount - cashPaid} more`);
      setVisible(false);
      return;
    } else if (cashPaid === billAmount && cashPaid > 0) {
      setMessage("Yayyy! You paid the exact bill amount");
      setVisible(false);
      return;
    } else {
      setMessage(null);
      setVisible(true);
      const note = cashRegister(
        notesAccepted,
        Number(billAmount),
        Number(cashPaid)
      );

      setNotesReturn(note);
    }
  };

  return (
    <div className="App">
      <h1>💵 Cash Register</h1>

      <main>
        <p className="title">Enter Bill Amount And Cash Paid</p>

        <div>
          <div className="inputContainer">
            <label htmlFor="billAmount">Bill Amount:</label>
            <input
              type="number"
              id="billAmount"
              required
              onChange={(event) => setBillAmount(event.target.value)}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="cashPaid">Cash Paid:</label>
            <input
              type="number"
              id="cashPaid"
              required
              onChange={(event) => setCashPaid(event.target.value)}
            />
          </div>

          <div className="buttonContainer">
            <span onClick={submitEventHandler}>Check</span>
          </div>

          {message && (
            <div className="result-display">
              <p className="error">{message}</p>
            </div>
          )}
          {visible && (
            <div className="result-display">
              <ul className="note-list">
                {Object.keys(notesReturn).map((note) => (
                  <li key={note}>
                    <span>{note}:</span>
                    <span>{notesReturn[note]}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
