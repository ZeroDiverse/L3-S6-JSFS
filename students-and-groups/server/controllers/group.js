const {StudentModel} = require('../models/Student')
const Student = StudentModel
const Group = require('../models/Group')


module.exports.getStudentsWithoutGroupId = async (req, res) => {
    try {
        const students = await Student.find({})
        const groups = await Group.find({})
        const studentNoGroup = students.filter(async (student) =>
        {
            const group = await Group.findOne({student})
            return  group === null || group === undefined
        })
        return res.status(200).json(groups)
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
}

module.exports.getStudentsByGroupId = async (req, res) => {
    try {
        const {groupNumber} = req.params
        console.log(await Group.find({}));
        const groups = await Group.find({group: groupNumber})
        return res.status(200).json(groups)
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
}

module.exports.assignStudentToGroup = async (req, res) => {
    try {
        const {groupNumber, studentId} = req.params;
        const studentFound = await Student.findOne({_id: studentId});
        console.log(groupNumber)
        return res.status(201).json(await Group.create({
            student: studentFound,
            group: parseInt(groupNumber)
        }))
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
}

module.exports.unAssignStudentFromGroup = async (req, res) => {
    try {
        const {groupId} = req.params;
        return res.status(200).json(await Group.delete({_id: groupId}))
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
}
