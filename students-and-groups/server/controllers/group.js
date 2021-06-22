const {StudentModel} = require('../models/Student')
const Student = StudentModel
const Group = require('../models/Group')

/**
 * Get all the groups from the system
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
module.exports.getAllGroups = async (req, res) => {
    try {
        const groups = await Group.find({})
        return res.status(200).json(groups)
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
}

/**
 * Delete all the groups in the system
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
module.exports.deleteAllGroups = async (req, res) => {
    try {
        const groups = await Group.deleteMany({})
        return res.status(200).json(groups)
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
}

/**
 * Get all the students without group in the system
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
module.exports.getStudentsWithoutGroupId = async (req, res) => {
    try {
        //Get all the students
        const students = await Student.find({})
        const studentNoGroup = []
        //Check if the student is not in group then add to the studentNoGroup TODO: Optimize this one
        for(const student of students){
            if(!await Group.findOne({student: student._id})){
                studentNoGroup.push(student)
            }
        }
        return res.status(200).json(studentNoGroup)
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
}

/**
 * Get all the students by group id in the system
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
module.exports.getStudentsByGroupId = async (req, res) => {
    try {
        const {groupNumber} = req.params
        const students = []
        const groups = await Group.find({group: groupNumber})
        for(const group of groups){
            students.push(await Student.findOne({
                _id: group.student
            }))
        }
        return res.status(200).json(students)
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
}

/**
 * assign student to a group
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
module.exports.assignStudentToGroup = async (req, res) => {
    try {
        const {groupNumber, studentId} = req.params;
        console.log(studentId)
        return res.status(201).json(await Group.create({
            student: studentId,
            group: parseInt(groupNumber)
        }))
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
}


/**
 * Unassigned the student from the group
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
module.exports.unAssignStudentFromGroup = async (req, res) => {
    try {
        const {studentId} = req.params;
        return res.status(200).json(await Group.deleteOne({student: studentId}))
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
}
