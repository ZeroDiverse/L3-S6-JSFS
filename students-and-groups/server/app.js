const express = require('express');
const path = require('path');

const app = express();
const groupRouter = require('./routes/group');
const studentRouter = require('./routes/student');
const cors = require('cors');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Route for students
app.use('/api/students', studentRouter);

//Route for groups
app.use('/api/groups', groupRouter);

module.exports = app
