/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import NewTaskForm from "./NewTaskForm"
import { useContext } from "react"
import { FormContext } from "../contexts/FormContext"
import Modal from "react-modal"
import TaskSection from "./TaskSection"

function Board(){

    const {showTaskEdit, setShowTaskEdit} = useContext(FormContext)

    const {showForm, setShowForm} = useContext(FormContext)

    const [tasks, setTasks] = useState([])

    useEffect(()=> {
        fetch('http://localhost:4000/api/tasks', {method: 'GET', mode: 'cors'})
            .then(res => res.json())
            .then(data => setTasks(data.tasks))
    }, [showForm])
    
    console.log(tasks)

    return(
        <div className="board">
            <TaskSection 
                tasks={tasks}
                type="All tasks"
                hide={true}
                classSection="task-in-progress"
            />
            <TaskSection 
                tasks={tasks.filter(task => task.done === true)}
                type="Task completed"
                hide={true}
                classSection="task-completed"
            />
            <TaskSection 
                tasks={tasks.filter(task => task.todo === true)}  
                type="Task to do"
                hide={true}  
                classSection="task-to-do"
            />
            <TaskSection 
                tasks={tasks.filter(task => task.todo === false)}  
                type="Task won't do"
                hide={true}  
                classSection="task-wont-do"
            />
            <button className="add-task" onClick={() => setShowForm(true)}>Add new task</button>
            <Modal isOpen={showForm} ariaHideApp={false}>
                <NewTaskForm />
            </Modal>
        </div>
    )
}

export default Board;