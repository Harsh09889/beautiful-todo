import React, { useState } from "react";
import TimeInput from "./TimeInput";

export default function AddTask(props) {
    const [priority, setPriority] = useState("High");
    const [taskText, setTaskText] = useState("");
    const [hrsMinSec, setHrsMinSec] = useState({ hrs: "", mins: "", sec: "" });
    const [timeRem, setTimeRem] = useState("");
    // console.log(timeRem);

  const priorityChanged = (e) => {
    setPriority(e.target.value);
  };

  const textChanged = (e) => {
    setTaskText((p) => {
      return e.target.value;
    });
  };

  const submitClicked = (e) => {
    e.preventDefault();
    if (timeRem && taskText && (hrsMinSec.hrs || hrsMinSec.mins || hrsMinSec.sec)) {
      props.add(taskText, priority, timeRem);
      setTaskText("");
      setHrsMinSec({hrs:'',mins:'',sec:''})
      setTimeRem("");
    } else {
      alert("Please fill both task and time fields...");
    }
  };

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
        <div className="form-outline-time">
          {/* <input type="text" id="form2" className="form-control" placeholder='Time remaining.. (Min:Sec)' value={timeRem} onChange={timeChanged} /> */}
          <TimeInput hrsMinSec={hrsMinSec} setHrsMinSec={setHrsMinSec} 
          setTimeRem = {setTimeRem}/>
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
            <label htmlFor="lo" style={{background:'green',padding:"3px",borderRadius:'5px',color:'black',marginTop:'2px',fontSize:'small'}}>Low Priority</label>
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
            <label htmlFor="me" style={{background:'yellow',padding:"3px",borderRadius:'5px',color:'black',marginTop:'2px',fontSize:'small'}}>Medium Priority</label>
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
            <label htmlFor="hi" style={{background:'red',padding:"3px",borderRadius:'5px',color:'black',marginTop:'2px',fontSize:'small'}}>High Priority</label>
          </div>
        </div>

        <button type="submit" className="btn" onClick={submitClicked}>
          Add new Task
        </button>
      </div>
    </form>
  );
}
