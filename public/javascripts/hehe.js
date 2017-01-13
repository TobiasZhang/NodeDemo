/**
 * Created by TT on 2017/1/13.
 */
$(function(){
  var iosocket = io.connect('http://192.168.1.103:3000/',{'reconnect': false });
  iosocket.on('connect', function () {
    console.log('--------connect----------')
    $('#incomingChatMessages').append($('<li>Connect</li>'));
  });
  iosocket.on('error',function(err){
    console.log('-----err---------');
  })
  iosocket.on('message', function(message) {
    $('#incomingChatMessages').append($('<li></li>').text(message));
  });
  iosocket.on('disconnect', function() {
    console.log('--------disconnect----------')
    $('#incomingChatMessages').append('<li>Disconnected</li>');
  });
  iosocket.on('autoreply',function(obj){
    $('#incomingChatMessages').append($('<li></li>').text('来自服务器：'+obj.msg));
  })

  $('#outgoingChatMessage').keypress(function(event) {
    if(event.which == 13) {
      event.preventDefault();
      iosocket.send($('#outgoingChatMessage').val());
      $('#incomingChatMessages').append($('<li></li>').text($('#outgoingChatMessage').val()));
      $('#outgoingChatMessage').val('');
    }
  });

  $('#submit_btn').click(function() {
    $('#incomingChatMessages').append($('<li></li>').text($('#outgoingChatMessage').val()));
    iosocket.emit('customclick',{msg: $('#outgoingChatMessage').val()})

    $('#outgoingChatMessage').val('');
  });

});