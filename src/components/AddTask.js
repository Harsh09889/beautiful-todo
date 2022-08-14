import React, { useState } from 'react'


export default function AddTask(props) {

    const [priority, setPriority] = useState('High')
    const [taskText, setTaskText] = useState('');
    const [timeRem, setTimeRem] = useState('')


    const priorityChanged = (e) => {
        setPriority(e.target.value)
    }

    const textChanged = (e) => {
        setTaskText((p) => {
            return e.target.value
        })
    }

    const timeChanged = (e) => {
        setTimeRem((p) => {
            return e.target.value
        })
    }

    const submitClicked = (e) => {
        e.preventDefault();
        if (timeRem && taskText) {
            props.add(taskText, priority, timeRem)
            setTaskText('')
            setTimeRem('')
        } else {
            alert("Please fill both task and time fields...")
        }
    }

    return (
        <form className="add-task">
            <div className='inputBoxes'>

                <div className="form-outline">
                    <input type="text" id="form" className="form-control" placeholder='Enter New Task...' value={taskText} onChange={textChanged} />
                </div>
                <div className="form-outline-time">
                    <input type="text" id="form2" className="form-control" placeholder='Min:Sec' value={timeRem} onChange={timeChanged} />
                </div>

            </div>


            <div className='btn-grp'>
                <div className='radio-col'>
                    <div className='radio-container'>

                        <input className='radios' type="radio" value="Low" name="priority" id="lo" onChange={priorityChanged} />
                        <label htmlFor="lo">Low Priority</label>
                    </div>

                    <div className='radio-container'>

                        <input className='radios' type="radio" value="Medium" name="priority" id="me" onChange={priorityChanged} />
                        <label htmlFor="me">Medium Priority</label>
                    </div>

                    <div className='radio-container'>

                        <input className='radios' type="radio" value="High" name="priority" id="hi" onChange={priorityChanged} />
                        <label htmlFor="hi">High Priority</label>
                    </div>

                </div>

                <button type="submit" className="btn" onClick={submitClicked}>Add new Task</button>

            </div>
        </form>
    )
}
