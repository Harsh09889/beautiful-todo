import React, { useRef, useState } from "react";
import "../styles/TimeInput.css";

export default function AddTask(props) {
  const [priority, setPriority] = useState("High");

  const deadlinetimeRef = useRef();

  const priorityChanged = (e) => {
    setPriority(e.target.value);
  };

  const textChanged = (e) => {
    setTaskText((p) => {
      return e.target.value;
    });
  };

  function playText(text){
    const utterance = new SpeechSynthesisUtterance(
      text
    );
    utterance.lang = 'hi-IN'
    utterance.rate = 0.8
    speechSynthesis.speak(utterance);
  }

  const submitClicked = (e) => {
    console.log(deadlinetimeRef.current.value);
    e.preventDefault();
    if (taskText && deadlinetimeRef.current.value) {
      playText(taskText)
      props.add(taskText, priority, deadlinetimeRef.current.value);
      setTaskText("");
      deadlinetimeRef.current.value = "";
    } else {
      playText("Please fill both task, and time fields...")
      alert("Please fill both task and time fields...");
    }
  };

  const [taskText, setTaskText] = useState("");

  return (
    <form className="add-task">
      <div className="inputBoxes">
        <div className="form-outline">
          <input
            type="text"
            id="form"
            className="form-control"
            placeholder="Enter New Task..."
            value={taskText}
            onChange={textChanged}
          />
        </div>

        <div className="deadline-input">
          <input
            className="digit inputTime"
            type="datetime-local"
            ref={deadlinetimeRef}
          />

          <h5 align="center" style={{ marginTop: "0.5rem" }}>
            Deadline Time
          </h5>
        </div>
      </div>

      <div className="btn-grp">
        <div className="radio-col">
          <div className="radio-container">
            <input
              className="radios"
              type="radio"
              value="Low"
              name="priority"
              id="lo"
              onChange={priorityChanged}
            />
            <label
              htmlFor="lo"
              style={{
                background: "#00ee00",
                padding: "3px",
                borderRadius: "5px",
                color: "black",
                marginTop: "2px",
                fontSize: "small",
              }}
            >
              Low Priority
            </label>
          </div>

          <div className="radio-container">
            <input
              className="radios"
              type="radio"
              value="Medium"
              name="priority"
              id="me"
              onChange={priorityChanged}
            />
            <label
              htmlFor="me"
              style={{
                background: "#ffcc00",
                padding: "3px",
                borderRadius: "5px",
                color: "black",
                marginTop: "2px",
                fontSize: "small",
              }}
            >
              Medium Priority
            </label>
          </div>

          <div className="radio-container">
            <input
              className="radios"
              type="radio"
              value="High"
              name="priority"
              id="hi"
              onChange={priorityChanged}
            />
            <label
              htmlFor="hi"
              style={{
                background: "#ff9900",
                padding: "3px",
                borderRadius: "5px",
                color: "black",
                marginTop: "2px",
                fontSize: "small",
              }}
            >
              High Priority
            </label>
          </div>
        </div>

        <button type="submit" className="btn" onClick={submitClicked}>
          Add new Task
        </button>
      </div>
    </form>
  );
}
