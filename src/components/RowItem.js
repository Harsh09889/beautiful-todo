import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import Timer from "./Timer";

export default function RowItem(props) {
  const styles = {
    backgroundColor: props.isComplete ? "green" : "transparent",
  };


  const toggleCompleteHandler = () => {
    if(props.isComplete === false){
      if(props.initialHours > 0 || props.initialMinute > 0 || props.initialSeconds > 0){
        props.setShowCeleb(true);
        setTimeout(() => {
          props.setShowCeleb(false);
        }, 8000);
      }
    }
    props.toggleIsComplete()
  }

  return (
    <tr style={styles}>
     
      <td>
        <span>
          <Timer
            id={props.id}
            timeUpdate={() => props.timeUpdate()}
            initialSeconds={props.initialSeconds}
            initialMinute={props.initialMinute}
            initialHours = {props.initialHours}
            timeTrack = {props.timeTrack}
          />
        </span>
      </td>

      <td className={`task-td`}>
        <h4 className={`${props.priority}-p`}>{props.task}</h4>
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
