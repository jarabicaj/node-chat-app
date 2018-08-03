// we are making request from the client to the server
let socket = io();
// open up a web socket and keep that connection open
socket.on('connect', function () {    // we listen to event
    console.log('Connected to server');


});

socket.on('disconnect', function () {  // it is gonna fire when connection drops
    console.log('Disconnected from server')
}) ;

//custom event
socket.on('newMessage', function (message) {
    console.log('New message',message);
});




