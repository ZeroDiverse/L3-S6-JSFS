const {verifyStudentData} = require("../helpers/validator");
const {getAllStudents, deleteStudentById, createNewStudent, updateStudent} = require("../controllers/student");
const router = require('express').Router()


router.get('/students', getAllStudents)

router.post('/students', verifyStudentData, createNewStudent)

router.patch('/students', verifyStudentData, updateStudent)

router.delete('/students/:id', deleteStudentById)


module.exports = router
