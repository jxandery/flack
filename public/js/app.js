var name    = getQueryVariable('name') || 'Anonymous';
var room    = getQueryVariable('room');
var socket  = io();

console.log(name + ' wants to join ' + room);

jQuery('.room-title').text(room);

socket.on('connect', function() {
  console.log('Conected to socket.io server!');

  socket.emit('joinRoom', {
    name: name,
    room: room
  });
});

socket.on('message', function(message) {
  var momentTimestamp = moment.utc(message.timestamp);
  var $messages        = jQuery('.messages');
  var $message         = jQuery('<li class="list-group-item"></li>');

  console.log('new message:');
  console.log(message.text);

  $message.append('<p><strong>' + message.name + ' ' + momentTimestamp.local().format('h:mm a') +  '</strong>');
  $message.append('<p>' + message.text + '</p>');
  $messages.append($message);


});

// handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function(event) {
  event.preventDefault();

  // assigns the input field to the variable message
  // the $ makes it available throughout the app as a jquery variable
  var $message = $form.find('input[name=message]');

  // broadcasts whatever has been inputted in the message input field
  socket.emit('message', {
    name: name,
    text: $message.val()
  });

  // resets the input field to blank
  $message.val('');

});

