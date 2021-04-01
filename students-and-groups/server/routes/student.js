const {verifyStudentData} = require("../helpers/validator");
const {getAllStudents, deleteStudentById, createNewStudent, updateStudent} = require("../controllers/student");
const router = require('express').Router()


router.get('/', getAllStudents)

router.post('/', verifyStudentData, createNewStudent)

router.patch('/', verifyStudentData, updateStudent)

router.delete('/:id', deleteStudentById)


module.exports = router
