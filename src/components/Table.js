import React from "react";
import RowItem from "./RowItem";
import { useState, useEffect } from "react";
// import Tasks from './Tasks';
import AddTask from "./AddTask";

const getLocalItems = () => {
  let Tasks = localStorage.getItem("todoList");
  if (Tasks) {
    return JSON.parse(localStorage.getItem("todoList"));
  } else {
    return [];
  }
};

export default function Table(props) {
  const [tasks, setTasks] = useState(getLocalItems());

  const toggleIsComplete = (id) => {

    setTasks((prev) => {
      let newer = prev.map((task) => {
        return task.id === id
          ? { ...task, isComplete: !task.isComplete }
          : { ...task };
      });

      return newer;
    });

  };

  const addTaskHandler = (taskText, priority, timeRem) => {
    let s = timeRem.split(":");
    let hrs = 0;
    let sec = 0;
    let min = 0;
    if (s[0] !== "") hrs = Number(s[0]);
    if (s[1] !== "") min = Number(s[1]);
    if (s[2] !== "") sec = Number(s[2]);
    const newTask = {
      id: tasks.length + 1,
      task: taskText,
      priority: priority,
      isComplete: false,
      initialSeconds: sec,
      initialMinute: min,
      initialHours: hrs
    };

    const newTasks = [...tasks];
    newTasks.push(newTask);
    setTasks(newTasks);
  };

  const deleteTask = (id) => {
    const delTasks = [];

    tasks.map((task) => {
      return task.id !== id && delTasks.push(task);
    });

    setTasks(delTasks);
  };

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(tasks));
  }, [tasks]);

  const timeUpdate = (id) => {
    setTasks((prev) => {
      let newer = prev.map((task) => {
        return task.id === id
          ? { ...task,initialHours:0 ,initialMinute: 0, initialSeconds: 0 }
          : { ...task };
      });

      return newer;
    });
  };

  const timeTrack = (id, hours, minutes, seconds) => {
    // console.log(id,hours,minutes,seconds)
    setTasks((prev) => {
      let newer = prev.map((task) => {
        return task.id === id
          ? { ...task, initialHours:hours,initialMinute: minutes, initialSeconds: seconds}
          : { ...task };
      });

      return newer;
    });
  }

  // console.log(timeTrack)

  const row = tasks.map((task) => {
    return (
      <RowItem
        key={task.id}
        id={task.id}
        priority={task.priority}
        task={task.task}
        toggleIsComplete={() => toggleIsComplete(task.id)}
        isComplete={task.isComplete}
        deleteTask={() => deleteTask(task.id)}
        initialHours = {task.initialHours}
        initialSeconds={task.initialSeconds}
        initialMinute={task.initialMinute}
        timeUpdate={timeUpdate}
        timeTrack = {timeTrack}
        setShowCeleb = {props.setShowCeleb}
      />
    );
  });

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Time left</th>
            <th>Task</th>
            {/* <th>Priority</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{row}</tbody>
      </table>
      <AddTask add={addTaskHandler} />
    </>
  );
}
