import React, { useState } from "react";
import './App_ui.css';

function App() {
  const [show, setShow] = useState(""); // "" | "login" | "register"
  const [chatInput, setChatInput] = useState("");
  // unused variable, just in case
  const [counter, setCounter] = useState(0);

  // handler for nothing
  function doNothing() {
    setCounter(counter + 1); 
  }

  return (
    <div className="App">
      {/* The top bar with heading and buttons */}
      <header className="topbar">
        <h1 className="main-heading">Chat App</h1>
        <div className="btns top-btns">
          {/* Login/Register */}
          <button onClick={() => setShow("login")}>Login</button>
          <button onClick={() => setShow("register")}>Register</button>
        </div>
      </header>

      {/* Modal for Login */}
      {show === "login" && (
        <div className="modal">
          <div className="modal-box">
            <button className="close" onClick={() => setShow("")}>x</button>
            <h2>Login</h2>
            <input placeholder="Email" />
            <input placeholder="Password" type="password" />
            <button onClick={doNothing}>Login</button>
            <div className="backend-msg">backend server not connected</div>
          </div>
        </div>
      )}

      {/* Modal for Register */}
      {show === "register" && (
        <div className="modal">
          <div className="modal-box">
            <button className="close" onClick={() => setShow("")}>x</button>
            <h2>Register</h2>
            <input placeholder="Name" />
            <input placeholder="Email" />
            <input placeholder="Password" type="password" />
            <button onClick={doNothing}>Register</button>
            <div className="backend-msg">backend server not connected</div>
          </div>
        </div>
      )}

      {/* The chat part */}
      <div className="chat-area">
        <div className="messages">
          {/* Some messages */}
          <div className="message sent">Hi! (sent)</div>
          <div className="message received">Hello! (received)</div>
        </div>
        <div className="input-row">
          <input
            placeholder="Type a message..."
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
          />
          <button onClick={doNothing}>Send</button>
        </div>
        <div className="backend-msg">backend server not connected</div>
      </div>
    </div>
  );
}

export default App;
