module.exports.verifyStudentData = (req, res, next) => {
    const {firstname, lastname, studentNumber} = req.body

    if (!lastname) {
        return res.status(400).json({err: 'Missing lastname'})
    }
    if (!studentNumber) {
        return res.status(400).json({err: 'Missing student number'})
    }
    if (!firstname) {
        return res.status(400).json({err: 'Missing firstname'})
    }
    next()
}
