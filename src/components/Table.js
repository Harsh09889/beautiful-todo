import React from "react";
import RowItem from "./RowItem";
import { useState, useEffect } from "react";
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

  const [timeRem,setTimeRem ] = useState(0)  

  const addTaskHandler = (taskText, priority, deadlineTime) => {
    
    const newTask = {
      id: tasks.length + 1,
      task: taskText,
      priority: priority,
      isComplete: false,
      deadlineTime: deadlineTime,
      timeRem:timeRem
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


  const row = tasks.map((task) => {
    return (
      <RowItem
        key={task.id}
        id={task.id}
        priority={task.priority}
        task={task.task}
        toggleIsComplete={() => toggleIsComplete(task.id)}
        isComplete={task.isComplete}
        timeRem = {timeRem}
        setTimeRem = {setTimeRem}
        deleteTask={() => deleteTask(task.id)}
        deadlineTime= {task.deadlineTime}
        setShowCeleb = {props.setShowCeleb}
      />
    );
  });

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Time left</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{row}</tbody>
      </table>
      <AddTask add={addTaskHandler} />
    </>
  );
}
