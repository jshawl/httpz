var socket = io('http://localhost:3030');
socket.on('request', function (data) {
  $('.requests').prepend( data );
  $('.js-timeago').timeago();
});

$('.js-timeago').timeago();
