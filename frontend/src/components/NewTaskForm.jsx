/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import cancel from "/src/assets/cancel_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.png"
import { useContext } from "react";
import { FormContext } from "../contexts/FormContext";
import Modal from "react-modal"

function NewTaskForm(){

    const {showForm, setShowForm} = useContext(FormContext);

    const [name, setName] = useState("")

    const [description, setDescription] = useState("")

    const [done, setDone] = useState(false)

    const [toDo, setToDo] = useState(true)

    const [error, setError] = useState(null)

    const handleSubmit = (e) => {
        
        e.preventDefault()
    
        const task = {name, description, done, toDo}
    
        fetch('http://localhost:4000/api/tasks', {
          method: 'POST',
          body: JSON.stringify(task, null),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(json => {
            setName('')
            setDescription('')
            setDone(false)
            setToDo(true)
            console.log('new task added:', json)
        })
        .catch(error => {
            setError(error.message)
        })
    }

    return(
        <div className="add-new-task-section">
                <form action="POST" onSubmit={handleSubmit}>
                    <div className="title-and-cancel">
                        <h2>Task details</h2>
                        <img src={cancel} alt="" onClick={() => setShowForm(false)}/>
                    </div>
                    <div className="new-task-section">
                        <label htmlFor="">Task Name</label>
                        <input type="text" placeholder="Enter a task name" className=" new-task-name" onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="new-task-section">
                        <label htmlFor="">Description</label>
                        <textarea placeholder="Enter a short description here" onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div>
                        <p>Done?</p>
                        <div className="yes">
                            <input type="radio" id="yesdone" name="done" value={true} onChange={(e) => setDone(e.target.value)}/>
                            <label htmlFor="yesdone">Yes</label>
                        </div>
                        <div className="no">
                            <input type="radio" id="nodone" name="done" value={false} onChange={(e) => setDone(e.target.value)}/>
                            <label htmlFor="nodone">No</label>
                        </div>
                    </div>
                    <div>
                        <p>To Do?</p>
                        <div className="yes">
                            <input type="radio" id="yesdo" name="todo" value={true} onChange={(e) => setToDo(e.target.value)} />
                            <label htmlFor="yesdo">Yes</label>
                        </div>
                        <div className="no">
                            <input type="radio" id="nodo" name="todo" value={false} onChange={(e) => setToDo(e.target.value)}/>
                            <label htmlFor="nodo">No</label>
                        </div>
                    </div>
                    <div className="buttons">
                        <button>Save</button>
                        <input type="reset" value="Delete" />
                    </div>
                </form>
            </div>
    )
}

export default NewTaskForm;