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

    var li = jQuery('<li></li>'); //create element by jQuery
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);


});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {

    });
});

