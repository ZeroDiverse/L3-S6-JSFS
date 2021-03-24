const express = require('express');
const path = require('path');
const {StudentModel} = require('./models/Student')
const Student = StudentModel
const Group = require('./models/Group')

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, '..', './client/dist')));

app.get('/students', async (req, res) => {
    try {
        return res.status(200).json(await Student.find({}))
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
})

app.post('/students', async (req, res) => {
    const {firstname, lastname, studentNumber} = req.body
    if (!lastname) {
        return res.status(400).json({err: 'Missing lastname'})
    }
    if (!studentNumber) {
        return res.status(400).json({err: 'Missing student number'})
    }
    if (!firstname) {
        return res.status(400).json({err: 'Missing firstname'})
    }
    const verifiedLastname = lastname.toUpperCase()
    const verifiedFirstname = lastname[0].toUpperCase() + lastname.slice(1, lastname.length - 1)
    try {
        return res.status(201).json(await Student.create({
            lastname: verifiedLastname,
            firstname: verifiedFirstname,
            studentNumber
        }))
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
})

app.patch('/students', async (req, res) => {
    const {_id, firstname, lastname, studentNumber} = req.body
    console.log(_id)
    if (!lastname) {
        return res.status(400).json({err: 'Missing lastname'})
    }
    if (!studentNumber) {
        return res.status(400).json({err: 'Missing student number'})
    }
    if (!firstname) {
        return res.status(400).json({err: 'Missing firstname'})
    }
    const verifiedLastname = lastname.toUpperCase()
    const verifiedFirstname = lastname[0].toUpperCase() + lastname.slice(1, lastname.length - 1)
    try {
        return res.status(200).json(await Student.findByIdAndUpdate({_id}, {
            lastname: verifiedLastname,
            firstname: verifiedFirstname,
            studentNumber
        }))
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
})

app.delete('/students/:id', async (req, res) => {
    const {id} = req.params
    try {
        return res.status(204).json(await Student.findByIdAndDelete(id))
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
})

app.get('/groups/:groupNumber/students', async (req, res) => {
    try {
        const {groupNumber} = req.params
        const groups = await Group.find({group: groupNumber})
        return res.status(204).json(groups)
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
})

app.get('/groups/:groupNumber/students/:studentId', async (req, res) => {
    try {
        const {groupNumber, studentId} = req.params
        const group = await Group.create({student: studentId, group: groupNumber})
        return res.status(200).json(group)
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
})

app.get('/groups', async (req, res) => {
    try {
        return res.status(200).json(await Group.find({}))
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
})

module.exports = app
