const express = require ('express');
const http = require ('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app); //nezmenime funkcnost ale je to potrebne kvoli web sockets
let io = socketIO(server); //web sockets server

app.use(express.static(publicPath));

// we can listen for specific event and do sth when event happens
// connection - listen for a new connection meaning that a client connected to server
// and do sth when connection comes in (callback function)
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('User was disconnected')
    })
});

server.listen(port, () => {
    console.log(`Server is running on port ${port} ...`);
});
