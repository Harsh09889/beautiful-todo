import React from 'react'
import RowItem from './RowItem'
import { useState } from "react";
import Tasks from './Tasks';

export default function Table() {

const [tasks,setTasks] = useState(Tasks);

const toggleIsComplete = (id) => {
    
    setTasks((prev) => {
        
        let newer =  prev.map((task) => {
           return task.id === id ? {...task, isComplete : !task.isComplete} : {...task};
        })

        return newer;
    })
}

const row = tasks.map((task) => {
    return(

        <RowItem key = {task.id} priority = {task.priority} task={task.task} toggleIsComplete = {() => toggleIsComplete(task.id)} isComplete = {task.isComplete}/>
    )
})

    return (
        <table>
            <thead>
                <tr>
                  <th scope="col">Task</th>
                  <th scope="col">Priority</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
            <tbody>
                {row}
            </tbody>
        </table>

    )
}
