import React, { useState, useEffect } from "react";
import alarm from "../assets/alarm.wav";

function Timer({ deadlineTime, setTimeRem, isComplete }) {
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

  function playText(text){
    const utterance = new SpeechSynthesisUtterance(
      text
    );
    utterance.lang = 'hi-IN'
    utterance.rate = 0.8
    speechSynthesis.speak(utterance);
  }

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval, idx) => {
    if (!timeLeft[interval]) {
      return;
    }
    // console.log(interval)
    timerComponents.push(
      <span key={idx}>
        {timeLeft[interval] !== "00" && timeLeft[interval]}{" "}
        {timeLeft[interval] !== "00" && interval !== "seconds" ? " : " : ""}
      </span>
    );

  });


  const [count,setCount] = useState(0)
  const [countWarn,setCountWarn] = useState(0)
  useEffect(() => {
    
    if(!isComplete && timeLeft.days==='00' && timeLeft.hours=== '00' && timeLeft.minutes=== '00' && timeLeft.seconds === 59 && countWarn === 0 ){
      playText("Only 1 minute left for a task to complete")
      setCountWarn(countWarn+1)
    }

    if(!isComplete && !timerComponents.length && count === 0){
      const alarmSound = new Audio(alarm)
      alarmSound.volume = 0.1
      alarmSound.play()
      setCount(count+1)
    }
  },[timerComponents.length,count,timeLeft,countWarn,isComplete])


  return (
    <div align="center">
      
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    
    </div>
  );
}

export default Timer;
