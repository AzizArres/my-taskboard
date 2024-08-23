const express = require('express')
const mongoose = require('mongoose')
const tasksRoutes = require('./routes/tasks')
const cors = require('cors')
require('dotenv').config()

// express app
const app = express()

// Enable CORS for all routes
app.use(cors())

// middleware
app.use(express.json())

// routes
app.use('/api/tasks', tasksRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  })