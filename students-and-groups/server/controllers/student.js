const {StudentModel} = require('../models/Student')
const Student = StudentModel
const Group = require('../models/Group')


/**
 * Get all the students from the database
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports.getAllStudents = async (req, res) => {
    try {
        return res.status(200).json(await Student.find({}))
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
}

module.exports.createNewStudent = async (req, res) => {
    const {firstname, lastname, studentNumber} = req.body
    const verifiedLastname = lastname.toUpperCase()
    const verifiedFirstname = firstname[0].toUpperCase() + firstname.slice(1, firstname.length)
    try {
        if (await Student.findOne({studentNumber})) {
            return res.status(502).json({
                message: "Cannot created student, student number duplicated"
            })
        }
        return res.status(201).json(await Student.create({
            lastname: verifiedLastname,
            firstname: verifiedFirstname,
            studentNumber
        }))
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
}

module.exports.updateStudent = async (req, res) => {
    const {_id, firstname, lastname} = req.body
    const verifiedLastname = lastname.toUpperCase()
    const verifiedFirstname = firstname[0].toUpperCase() + firstname.slice(1, firstname.length)
    try {
        await Student.findByIdAndUpdate({_id}, {
            lastname: verifiedLastname,
            firstname: verifiedFirstname,
        })

        return res.status(200).json({
            _id,
            lastname: verifiedLastname,
            firstname: verifiedFirstname,
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
}

/**
 * Delete student by id
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports.deleteStudentById = async (req, res) => {
    const {id} = req.params
    try {
        await Group.deleteOne({
            student: id
        })
        return res.status(204).json(await Student.findByIdAndDelete(id))
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
}
