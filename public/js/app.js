var socket = io('http://127.0.0.1:3030');
socket.on('request', function (data) {
  $('.requests').prepend( data );
  render();
});

var render = function render(){
  $('.js-timeago').timeago();
  $(".js-jsonview").each(function( i, js ){
    $(js).JSONView(  $(js).html() );
  });
}
render();
