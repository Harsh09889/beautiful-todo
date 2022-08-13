import React from 'react'
import RowItem from './RowItem'
import { useState, useEffect } from "react";
// import Tasks from './Tasks';
import AddTask from './AddTask';

const getLocalItems = () => {
    let Tasks = localStorage.getItem('todoList');
    if (Tasks) {
        return JSON.parse(localStorage.getItem('todoList'))
    }else{
        return [];
    }
}

export default function Table() {
    
    const [tasks, setTasks] = useState(getLocalItems());

    const toggleIsComplete = (id) => {

        setTasks((prev) => {

            let newer = prev.map((task) => {
                return task.id === id ? { ...task, isComplete: !task.isComplete } : { ...task };
            })

            return newer; 
        })
    }

    const addTaskHandler = (taskText,priority,timeRem) => {
        
        let s = timeRem.split(":");
        let sec = 0
        let min = 0
        if(s[0] !== '') min = Number(s[0])
        if(s[1]) sec = Number(s[1])
        const newTask = {
            id: tasks.length+1,
            task:taskText,
            priority:priority,
            isComplete:false,
            initialSeconds:sec,
            initialMinute:min
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

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(tasks));
    },[tasks]);


    const row = tasks.map((task) => {
        return (
            <RowItem 
            key={task.id} 
            priority={task.priority} 
            task={task.task} 
            toggleIsComplete={() => toggleIsComplete(task.id)} isComplete={task.isComplete} 
            deleteTask= {() => deleteTask(task.id)} 
            initialSeconds={task.initialSeconds}
            initialMinute={task.initialMinute}
            />
        )
    })

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Priority</th>
                        <th>Time remaining</th>
                        <th>Actions</th>
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
