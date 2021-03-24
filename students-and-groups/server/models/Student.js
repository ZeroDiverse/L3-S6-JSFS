const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    studentNumber: {
        type: String,
        unique: true
    },
    lastname: {
        type: String,
        required: true
    },
    firstname: {
        type: String
    }
})

const StudentModel = mongoose.model('Student', StudentSchema)

module.exports = {
    StudentSchema,
    StudentModel
}
