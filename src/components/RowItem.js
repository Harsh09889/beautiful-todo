import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import Timer from "./Timer";

export default function RowItem(props) {
  const styles = {
    backgroundColor: props.isComplete ? "green" : "transparent",
  };

  return (
    <tr style={styles}>
      <td className="task-td">
        <h3>{props.task}</h3>
      </td>

      <td className="priority-td">
        <span className={`${props.priority}-p`}>{props.priority} Priority</span>
      </td>

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

      <td>
        <FontAwesomeIcon
          onClick={props.toggleIsComplete}
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
