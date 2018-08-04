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

    let li = jQuery('<li></li>'); //crea te element by jQuery
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    let li = jQuery('<li></li>');
    let a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);

    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    let messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('');

    });
});

let locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function () {
        alert('Unable to fetch location.');
        locationButton.removeAttr('disabled');
    })

});