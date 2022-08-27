import React, { useEffect } from "react";
import "./TimeInput.css";

const TimeInput = (props) => {
  useEffect(() => {
    props.setTimeRem(
      `${props.hrsMinSec.hrs}:${props.hrsMinSec.mins}:${props.hrsMinSec.sec}`
    );
  }, [props]);

  // console.log(props.hrsMinSec)
  const hrsHandle = (e) => {
    let changedHrs = e.target.value;
    props.setHrsMinSec((p) => {
      let newArr = {
        ...p,
        hrs: changedHrs,
      };
      return newArr;
    });
  };
  const minHandle = (e) => {
    let changedMin = e.target.value;
    props.setHrsMinSec((p) => {
      let newArr = {
        ...p,
        mins: changedMin,
      };
      return newArr;
    });
  };
  const secHandle = (e) => {
    let changedSec = e.target.value;
    props.setHrsMinSec((p) => {
      let newArr = {
        ...p,
        sec: changedSec,
      };
      return newArr;
    });
  };

  return (
    <div id="inputs" style={{display:'flex'}}>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        <input
          type="text"
          onChange={hrsHandle}
          className="digit hrs"
          id="verificationCodeDigit1"
          minLength="1"
          maxLength="2"
          required
          value={props.hrsMinSec.hrs}
        />
        <label>Hr</label>
      </div>

      <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>

      <input
        type="text"
        onChange={minHandle}
        className="digit min"
        id="verificationCodeDigit2"
        minLength="1"
        maxLength="2"
        required
        value={props.hrsMinSec.mins}
        />
        <label>Min</label>
        </div> 


      <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        
      <input
        type="text"
        onChange={secHandle}
        className="digit sec"
        id="verificationCodeDigit3"
        minLength="1"
        maxLength="2"
        required
        value={props.hrsMinSec.sec}
        />
        <label>Sec</label>
        </div>
    </div>
  );
};

export default TimeInput;
