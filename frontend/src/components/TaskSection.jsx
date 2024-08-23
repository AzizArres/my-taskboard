 /* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react"
import Modal from "react-modal"
import TaskEdit from "./TaskEdit"
import { useContext } from "react"
import { FormContext } from "../contexts/FormContext"



function TaskSection(props){

    const [hide, setHide] = useState(true)

    function toggleHide(){
        setHide(prevHide => !prevHide)
    }

    const {showTaskEdit, setShowTaskEdit} = useContext(FormContext)
    
    const {id, setId} = useContext(FormContext)

    function handleEditClick(taskId) {
      setShowTaskEdit(true);
      setId(taskId);
    }

    function handleDelete(id) {
      fetch(`http://localhost:4000/api/tasks/${id}`, {
        method: "DELETE"
      })
      .then(res => {
        if(!res.ok){
            throw new Error(res.statusText)
        }
        return res.json()
      })
      .then(json => console.log("task deleted : ", json))
      .catch(err => console.log(err.message))
    }

    return (
      <div className={props.classSection}>
        <p className="section-title" onClick={toggleHide}>
          {props.type}
        </p>
        <div className={`tasks-section ${hide ? "hide" : null}`}>
          {props.tasks.map((task) => (
            <div key={task._id} className="unique-task">
              <div>
                <p className="task-title">{task.name}</p>
                <p className="task-description">{task.description}</p>
                <p className="date">Created at: {task.createdAt}</p>
                <p className="date">Last updated at: {task.updatedAt}</p>
              </div>
              <button
                className="edit-button"
                onClick={() => handleEditClick(task._id)}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(task._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <Modal isOpen={showTaskEdit} ariaHideApp={false}>
          <TaskEdit id={id} />
        </Modal>
      </div>
    );
  }
  
  export default TaskSection;