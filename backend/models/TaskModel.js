const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = new Schema({
    name: {
        type: String, 
        required: true
    }, 
    description: {
        type: String,
        required: false
    },
    done: {
        type: Boolean,
        required: true,
        default: false
    }, 
    todo: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Task', taskSchema )