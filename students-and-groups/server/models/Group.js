const mongoose = require('mongoose')

const GroupSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    group: {
        type: Number,
        required: true
        //enum: [1, 2, 3, 4, 5, 6]
    }
})

const GroupModel = mongoose.model('Group', GroupSchema)

module.exports = GroupModel
