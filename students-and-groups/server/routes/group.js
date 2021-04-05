const router = require('express').Router()
const {getStudentsWithoutGroupId, unAssignStudentFromGroup, getStudentsByGroupId, assignStudentToGroup} = require("../controllers/group");


router.get('/', getStudentsWithoutGroupId)

router.get('/:groupNumber/students', getStudentsByGroupId)

router.get('/:groupNumber/students/:studentId', assignStudentToGroup)

router.patch('/:groupId', unAssignStudentFromGroup)

module.exports = router
