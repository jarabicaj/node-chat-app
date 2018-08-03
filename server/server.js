const express = require ('express');
const http = require ('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express();
//nezmenime funkcnost ale je to potrebne kvoli web sockets:
let server = http.createServer(app);
let io = socketIO(server); //web sockets server

app.use(express.static(publicPath));

// we can listen for specific event and do sth when event happens
// connection - listen for a new connection meaning that a client connected to server
// and do sth when connection comes in (callback function)
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: "dzejo",
        text: "Hi Bro",
        createdAt: 12345
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message)
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected')
    })
});

server.listen(port, () => {
    console.log(`Server is running on port ${port} ...`);
});
