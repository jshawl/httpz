var socket = io('http://localhost:3030');
socket.on('request', function (data) {
  $('.requests').prepend( data );
  render();
});

var render = function render(){
  $('.js-timeago').timeago();
  $(".js-jsonview").each(function( i, js ){
    console.log(i);
    try{
      $(js).JSONView( JSON.parse($(js).html()) );
    }
    catch(e){
      $(js).JSONView( $(js).html() );
    }
  });
}
render();
