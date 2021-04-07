const express = require('express');
const path = require('path');

const app = express();
const groupRouter = require('./routes/group');
const studentRouter = require('./routes/student');
const cors = require('cors');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, '/public')));

app.use('/api/students', studentRouter);

app.use('/api/groups', groupRouter);

module.exports = app
