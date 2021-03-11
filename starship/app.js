const express = require('express')
const path = require('path')
const app = express()
const colors = require('colors')
const http = require('http').Server(app);
const io = require('socket.io')(http);

//Use static assets
app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, '/public/dist/index.html'))
})

app.get('/game', (req, res) => {
    return res.sendFile(path.join(__dirname, '/public/dist/index.html'))
})

const PORT = 3000

/*
//Start the server on port 3000
app.listen(PORT, () => {
    console.log(`Server start in port ${PORT}. Please go to end point game at /game`.yellow.underline)
})
*/

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


http.listen(PORT, () => {
    console.log('listening on *:3000');
});
