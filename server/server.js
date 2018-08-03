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
        from: "Admin",
        text: "Welcome to the chat app",
        createdAt: new Date().getTime()

    });

    socket.broadcast.emit('newMessage', {
        from: "Admin",
        text: "New user joined",
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);

        // send to everyone who is connected INCLUDE ME
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });

        // // send to everyone??? who is connected EXCLUDE ME
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected')
    })
});

server.listen(port, () => {
    console.log(`Server is running on port ${port} ...`);
});
