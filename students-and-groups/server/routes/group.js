const router = require('express').Router()
const {unAssignStudentFromGroup, getStudentsByGroupId, assignStudentToGroup} = require("../controllers/group");


router.get('/:groupNumber/students', getStudentsByGroupId)

router.post('/', assignStudentToGroup)

router.delete('/:groupId', unAssignStudentFromGroup)

module.exports = router
