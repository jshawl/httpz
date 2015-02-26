var socket = io();
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
 for( var i = 0; i < apts.length; i++ ){
   console.log(apts[i]);
   var apt = apts[i];
   var $link = $("<a class='recent-link' href='/"+ apt.slug +"'>/"+ apt.slug +" </a>")
   var $time = $("<abbr class='js-timeago' title='"+ apt.createdAt +"'></abbr>")
   $link.append( $time );
   $('.js-recent').append( $link );
 }
}

render();
