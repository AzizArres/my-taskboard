/* eslint-disable no-unused-vars */
import React from "react"
import cancel from "/src/assets/cancel_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.png"
import { useContext, useState } from "react";
import { FormContext } from "../contexts/FormContext";
import PropTypes from "prop-types";

function TaskEdit(){

    const { showTaskEdit, setShowTaskEdit } = useContext(FormContext);

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [done, setDone] = useState(false)
    const [todo, setTodo] = useState(false)
    
    const [task, setTask] = useState({}) 

    const {id, setId} = useContext(FormContext)

    const handleSubmit = (e) => {

        e.preventDefault()

        fetch(`http://localhost:4000/api/tasks/${id}`, {method: 'GET', mode: 'cors'})
            .then(res => res.json())
            .then(data => setTask(data.tasks))

        const editTask = {
            name: name === "" ? task.name : name,
            description: description === "" ? task.description : description,
            done: task.done === done ? task.done : done,
            todo: task.todo === todo ? task.todo : todo
        }

        fetch(`http://localhost:4000/api/tasks/${id}`, {
            method: "PATCH",
            mode:  "cors",
            body: JSON.stringify(editTask),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then(res => {
            if(!res.ok){
                throw new Error(res.statusText)
            }
            return res.json()
        })
        .then(json => {
            setName('')
            setDescription('')
            setDone(false)
            setTodo(false)
            console.log("new task edited : ", json)
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    return(
        <div className="add-new-task-section">
                <form action="POST" onSubmit={handleSubmit}>
                    <div className="title-and-cancel">
                        <h2>Task Edit : </h2>
                        <img src={cancel} alt="" onClick={() => setShowTaskEdit(false)}/>
                    </div>
                    <div className="new-task-section">
                        <input type="text" placeholder="Edit name" className=" new-task-name" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="new-task-section">
                        <textarea placeholder="Edit decription" name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div>
                        <p>Set it to Done?</p>
                        <div className="yes">
                            <input type="radio" id="yesdone" name="done" value={true} checked={done} onChange={(e) => setDone(e.target.checked)}/>
                            <label htmlFor="yesdone">Yes</label>
                        </div>
                        <div className="no">
                            <input type="radio" id="nodone" name="done" value={false} checked={!done} onChange={(e) => setDone(!e.target.checked)}/>
                            <label htmlFor="nodone">No</label>
                        </div>
                    </div>
                    <div>
                        <p>Set it to To Do?</p>
                        <div className="yes">
                            <input type="radio" id="yesdo" name="todo" value={true} checked={todo} onChange={(e) => setTodo(e.target.checked)}/>
                            <label htmlFor="yesdo">Yes</label>
                        </div>
                        <div className="no">
                            <input type="radio" id="nodo" name="todo" value={false} checked={!todo} onChange={(e) => setTodo(!e.target.checked)}/>
                            <label htmlFor="nodo">No</label>
                        </div>
                    </div>
                    <div className="buttons">
                        <button>Save</button>
                        <input type="reset" value="Cancel" />
                    </div>
                </form>
            </div>
    )
}


export default TaskEdit;