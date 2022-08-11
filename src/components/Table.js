import React from 'react'
import RowItem from './RowItem'
import { useState } from "react";
// import Tasks from './Tasks';
import AddTask from './AddTask';

export default function Table() {
    
    const [tasks, setTasks] = useState([]);

    const toggleIsComplete = (id) => {

        setTasks((prev) => {

            let newer = prev.map((task) => {
                return task.id === id ? { ...task, isComplete: !task.isComplete } : { ...task };
            })

            return newer; 
        })
    }

    const addTaskHandler = (taskText,priority) => {
        
        const newTask = {
            id: tasks.length+1,
            task:taskText,
            priority:priority,
            isComplete:false
        }
        const newTasks = [...tasks]
        newTasks.push(newTask)
        
        setTasks(newTasks) 
    }

    const deleteTask = (id) => {
        
        const delTasks = []
        
        tasks.map((task) => {
            return (task.id !== id && delTasks.push(task))
        })

        setTasks(delTasks)
    }



    const row = tasks.map((task) => {
        return (
            <RowItem 
            key={task.id} 
            priority={task.priority} 
            task={task.task} 
            toggleIsComplete={() => toggleIsComplete(task.id)} isComplete={task.isComplete} 
            deleteTask= {() => deleteTask(task.id)} 
            />
        )
    })

    return (
        <>
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
            <AddTask add = {addTaskHandler}/>
        </>

    )
}
