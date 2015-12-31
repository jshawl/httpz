var socket = io();
var shouldProxy = document.getElementById('proxy');
var proxyPort = document.getElementById('port');

socket.on('request', function (data) {
  $('.requests').prepend( data );
  render();
});

socket.on('proxy', function (data) {
  if( shouldProxy.checked ){
    proxy( data, port.value );
  }
});

$('body').on('click', '.js-resend', function( event ){
  event.preventDefault();
  var data = $(this).data('json');
  var contentType = $(this).data('content-type');
  proxy( data, port.value, contentType );
})

var proxy = function proxy( payload, port, contentType ){
  if (contentType && contentType.indexOf('application/json') === 0) {
    // if request was sent as JSON, forward it as same content type
    payload = JSON.stringify(payload);
    headers = {
      'content-type': contentType
    };
  } else {
    headers = {};
  }
  $.ajax({
    type: "POST",
    async: true,
    data: payload,
    url: 'http://localhost:' + port,
    headers: headers
  });
}

var render = function render(){
  $('.js-timeago').timeago();
  $(".js-jsonview").each(function( i, js ){
    $(this).removeClass('js-jsonview');
    $(js).JSONView(  js.innerHTML );
  });
}

var Appointment = Object.create( new ActiveStorage("Appointment") );
var slug =  window.location.pathname.replace('/','');
if( slug != "" ){
  var apt = Appointment.findBy({ slug: slug })
  if(!apt){
    Appointment.create({
      slug: slug,
      createdAt: new Date()
    });
  }
} else {
 var apts = Appointment.all().reverse();
 if( apts.length ){
   $(".recent").show();
 }
 for( var i = 0; i < apts.length; i++ ){
   var apt = apts[i];
   var now = new Date().setHours(0,0,0,0)
   if( Date.parse(apt.createdAt) < now ){
     Appointment.find( apt.id ).destroy()
   } else {
     var $link = $("<a class='recent-link' href='/"+ apt.slug +"'>/"+ apt.slug +" </a>")
     var $time = $("<abbr class='js-timeago' title='"+ apt.createdAt +"'></abbr>")
     $link.append( $time );
     $('.js-recent').append( $link );
   }
 }
}

render();

$('.js-try-it').on('click', function( event ){
  event.preventDefault();
  var toEval = $('.js-try-it-code').html();
  eval( toEval );
});

$('.js-test-connection').on('click', function( e ){
  var $res = $('.js-connection-result');
  var $remove = $('<a href="#" class="remove js-clean-parent">&times;</a>')
  $.ajax({
    type: "POST",
    async: true,
    url: 'http://localhost:' + port.value,
    success: function(message,text,response){
      $res.attr('data-status','success')
      $res.html( "Ok" ).append( $remove );
    },
    error: function( xhr, status, err ){
      $res.attr('data-status','error')
      if( xhr.readyState == 0 ){
	$res.html( "Connection refused.").append( $remove );
      } else{
        $res.html( err ).append( $remove );
      }
    }
  });
});

$('body').on('click', '.js-clean-parent',function( event ){
  event.preventDefault();
  $(this).parent().html('').attr('data-status','');
})
