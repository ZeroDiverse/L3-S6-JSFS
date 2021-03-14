const express = require('express')
const path = require('path')
const app = express()
const colors = require('colors')
const server = require('http').Server(app);

//Use static assets
app.use(express.static(path.join(__dirname, '/public')))

//Route for
app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, '/public/index.html'))
})

//Route for about
app.get('/about', (req, res) => {
    return res.sendFile(path.join(__dirname, '/public/about.html'))
})

app.get('/bot/pfc', (req, res) => {
    return res.sendFile(path.join(__dirname, '/public/bot-pfc.html'))
})

//Route for the game
app.get('/pfc', (req, res) => {
    return res.sendFile(path.join(__dirname, '/public/pfc.html'))
})

module.exports = server
