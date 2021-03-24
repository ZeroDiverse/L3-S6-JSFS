const mongoose = require('mongoose')
const {StudentSchema} = require("./Student");

const GroupSchema = new mongoose.Schema({
    student: StudentSchema,
    group: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6]
    }
})

const GroupModel = mongoose.model('Group', GroupSchema)

module.exports = GroupModel
