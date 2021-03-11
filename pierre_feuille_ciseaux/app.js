const express = require('express')
const path = require('path')
const app = express()
const colors = require('colors')

//Use static assets
app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, '/public/dist/index.html'))
})

const PORT = 3000
//Start the server on port 3000
app.listen(PORT, () => {
    console.log(`Server start in port ${PORT}`.yellow.underline)
})
