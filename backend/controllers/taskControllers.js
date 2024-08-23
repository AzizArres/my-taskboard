const Task = require('../models/TaskModel')
const mongoose = require('mongoose')


// get all tasks
const getTasks = async(req, res) => {
    const tasks = await Task.find({}).sort({createdAt: -1})
    res.status(200).json({tasks})
}

// get a single task
const getTask = async(req, res) => {
    const { id } = req.params
    const task = await Task.findById(id)

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: "No such task"})
    }

    if(!Task){
        return res.status(404).json(task)
    }
}

// create a new task
const createTask = async(req, res) => {
    const { name, description, done, todo } = req.body

    // add a doc to db
    try {
        const task = await Task.create({name, description, done, todo})
        res.status(200).json(task)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a task
const deleteTask = async(req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such task"})
    }

    const task = await Task.findOneAndDelete({_id: id})

    if(!task)  {
        return res.status(404).json({error: "No such task"})
    }

    res.status(200).json(task)
}

// upadate a task
const updateTask = async(req, res) => {
    const { id } = req.params
     
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such task"})
    }

    const task = await Task.findOneAndUpdate({_id: id}, {... req.body})
    
    if(!task) {
        return res.status(404).json({error: "No such task"})
    }

    res.status(200).json(task)
}

module.exports = {
    getTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
}