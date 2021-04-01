const {StudentModel} = require('../models/Student')
const Student = StudentModel
const Group = require('../models/Group')

module.exports.getStudentsByGroupId = async (req, res) => {
    try {
        const {groupNumber} = req.params
        const groups = await Group.find({group: groupNumber})
        return res.status(204).json(groups)
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
}

module.exports.assignStudentToGroup = async (req, res) => {
    try {
        const {group, studentId} = req.body;
        const studentFound = await Student.findOne({_id: studentId});
        return res.status(201).json(await Group.create({
            student: studentFound,
            group: group
        }))
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
}

module.exports.unAssignStudentFromGroup = async (req, res) => {
    try {
        const {groupId} = req.params;
        return res.status(204).json(await Group.delete({_id: groupId}))
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
}
