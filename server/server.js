const express = require ('express');
const http = require ('http');
const path = require('path');
const socketIO = require('socket.io');

let {generateMessage, generateLocationMessage} = require('./utils/message');

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

    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        // send to everyone who is connected INCLUDE ME
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected')
    })
});

server.listen(port, () => {
    console.log(`Server is running on port ${port} ...`);
});
