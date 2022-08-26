import React from "react";
import { useState, useEffect } from "react";

const Timer = (props) => {
  let time = localStorage.getItem('as');
  let initialHours, initialMinute, initialSeconds;

  if (time) {
    let timeSeperated = time.split(":");
    initialHours = timeSeperated[0];
    initialMinute = timeSeperated[1];
    initialSeconds = timeSeperated[2];
  } else {
    initialHours = props.initialHours;
    initialMinute = props.initialMinute;
    initialSeconds = props.initialSeconds;
  }

  const [hours, setHours] = useState(initialHours);
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          if (hours === 0) {
            props.timeUpdate(props.id);
            clearInterval(myInterval);
          } else {
            // If hours are not zero but Minutes and seconds are
            setHours(hours - 1);
            setMinutes(59);
            setSeconds(59);
          }
        } else if (hours === 0) {
          setHours(0);
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    //   console.log(props.id,hours,minutes,seconds)
        props.timeTrack(props.id,hours,minutes,seconds)
      
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div>
      {hours === 0 && minutes === 0 && seconds === 0 ? (
        <h3 className="timer-text time-up">Time's up</h3>
      ) : (
        <p className="timer-text">
          {" "}
          {hours ? hours : "00"}:{minutes ? minutes : "00"}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </p>
      )}
    </div>
  );
};

export default Timer;
