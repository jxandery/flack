var socket = io();

socket.on('connect', function() {
  console.log('Conected to socket.io server!')
});

socket.on('message', function(message) {
  console.log('new message:');
  console.log(message.text);

  jQuery('.messages').append('<p>' + message.text + '</p>');


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
    text: $message.val()
  });

  // resets the input field to blank
  $message.val('');

});
