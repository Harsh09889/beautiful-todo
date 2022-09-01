import React, { useState, useEffect } from "react";
import alarm from "../assets/alarm.wav";

function Timer({ deadlineTime, setTimeRem }) {
  const calculateTimeLeft = () => {
    // 2022-09-01T19:05
    const yr = deadlineTime.slice(0, 4);
    const mon = deadlineTime.slice(5, 7);
    const date = deadlineTime.slice(8, 10);
    const hr = deadlineTime.slice(11, 13);
    const min = deadlineTime.slice(14, 16);

    // console.log('year',yr,'Month',mon,'Date',date,'Hours',hr,'minutes',min)

    let difference = +new Date(yr, mon - 1, date, hr, min, 0, 0) - +new Date();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days:
          Math.floor(difference / (1000 * 60 * 60 * 24)) > 9
            ? Math.floor(difference / (1000 * 60 * 60 * 24))
            : "0" + Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours:
          Math.floor((difference / (1000 * 60 * 60)) % 24) > 9
            ? Math.floor((difference / (1000 * 60 * 60)) % 24)
            : "0" + Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes:
          Math.floor((difference / 1000 / 60) % 60) > 9
            ? Math.floor((difference / 1000 / 60) % 60)
            : "0" + Math.floor((difference / 1000 / 60) % 60),
        seconds:
          Math.floor((difference / 1000) % 60) > 9
            ? Math.floor((difference / 1000) % 60)
            : "0" + Math.floor((difference / 1000) % 60),
      };
    } else{

    }


    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());


  useEffect(() => {

    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
      setTimeRem(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval, idx) => {
    if (!timeLeft[interval]) {
      return;
    }
    timerComponents.push(
      <span key={idx}>
        {timeLeft[interval] !== "00" && timeLeft[interval]}{" "}
        {timeLeft[interval] !== "00" && interval !== "seconds" ? " : " : ""}
      </span>
    );

  });


  const [count,setCount] = useState(0)

  useEffect(() => {
    console.log(count)
    if(!timerComponents.length && count === 0){

      new Audio(alarm).play()
      setCount(count+1)
    }
  },)


  return (
    <div align="center">
      
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    
    </div>
  );
}

export default Timer;
