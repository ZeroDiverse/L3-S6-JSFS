const router = require('express').Router()
const {getStudentsWithoutGroupId, unAssignStudentFromGroup, getStudentsByGroupId, assignStudentToGroup, getAllGroups, deleteAllGroups} = require("../controllers/group");


router.get('/', getAllGroups)

router.get('/students', getStudentsWithoutGroupId)

router.get('/:groupNumber/students', getStudentsByGroupId)

router.post('/:groupNumber/students/:studentId', assignStudentToGroup)

router.patch('/students/:studentId', unAssignStudentFromGroup)

router.delete('/', deleteAllGroups)

module.exports = router
