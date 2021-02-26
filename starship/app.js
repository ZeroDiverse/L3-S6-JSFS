const express = require('express')
const path = require('path')
const app = express()

//Use static assets
app.use(express.static(path.join(__dirname, '/public')))

//Start the server on port 3000
app.listen(3000, () => {
    
})
