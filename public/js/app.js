var socket = io();
socket.on('request', function (data) {
  $('.requests').prepend( data );
  render();
});

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
