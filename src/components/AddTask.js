import React, { useState } from 'react'

export default function AddTask(props) {
    
    const [priority,setPriority] = useState('High')
    const [taskText,setTaskText] = useState('');


    const priorityChanged = (e) => {
        setPriority(e.target.value)
    }

    const textChanged = (e) => {
        setTaskText((p) => {
            return e.target.value
        })    
    }

    const submitClicked = (e) => {
        e.preventDefault();
        taskText && props.add(taskText,priority)
        setTaskText('')
    }

    return (
        <form className="add-task">
            <div className="form-outline">
                <input type="text" id="form2" className="form-control" placeholder='Enter New Task...' value={taskText} onChange={textChanged}/>
            </div>
            <div className='btn-grp'>
            <div className='radio-col'>

            <input className='radios' type="radio" value = "Low" name="priority" id="lo" onChange={priorityChanged}/>
            <label htmlFor = "lo">Low Priority</label>


            <input className='radios' type="radio" value = "Medium" name="priority" id="me" onChange={priorityChanged}/>
            <label htmlFor = "me">Medium Priority</label>


            <input className='radios' type="radio" value = "High" name="priority" id="hi" onChange={priorityChanged}/>
            <label htmlFor = "hi">High Priority</label>
            
            </div>

            <button type="submit" className="btn" onClick={submitClicked}>Add new Task</button>

            </div>
        </form>
    )
}
