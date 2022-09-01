import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import Timer from "./Timer";

export default function RowItem(props) {
  const styles = {
    backgroundColor: props.isComplete ? "#c0c0c0" : "transparent",
  };
  // console.log(props.timeRem)

  function playText(text){
    const utterance = new SpeechSynthesisUtterance(
      text
    );
    utterance.lang = 'hi-IN'
    utterance.rate = 0.8
    speechSynthesis.speak(utterance);
  }
  
  const toggleCompleteHandler = () => {
    props.toggleIsComplete()

    if(props.isComplete === false){
      if(props.timeRem.seconds || props.timeRem.minutes){

        playText("Yoohhooo... Congratulations!!! You Have Completed your task beforehand")

        props.setShowCeleb(true);
        setTimeout(() => {
          props.setShowCeleb(false);
        }, 7000);
      }
    }
  }

  return (
    <tr style={styles}>
     

      <td className={`task-td`}>
        <h4 className={`${props.priority}-p`}>{props.task}</h4>
      </td>

      <td>
        <span>
          <Timer
            id={props.id}
            deadlineTime = {props.deadlineTime}
            setTimeRem={props.setTimeRem}
            isComplete={props.isComplete}
          />
        </span>
      </td>


      <td>
        <FontAwesomeIcon
          onClick={toggleCompleteHandler}
          className="action-icon"
          icon={faCheck}
        />
        <FontAwesomeIcon
          onClick={props.deleteTask}
          className="action-icon"
          icon={faTrashAlt}
        />
      </td>
    </tr>
  );
}
