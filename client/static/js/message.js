// $(document).ready(function(){
//   console.log('asdf');
//   var socket = io.connect();
//   // socket.on('load_messages',function(data){
//   //   $('#error').html('');
//   //   current_user = data.current_user;
//   //   var messages = data.messages;
//   //   var messages_thread ="";
//   //   for(var i =0; i < messages.length;i++){
//   //     messages_thread = '<p' + messages[i].name + ': ' + messages[i].message + '</p>';
//   //   $('#board').append(messages_thread);
//   // }
//   // })
//   // return false;
//   $('#clickme').click(function(){
//     socket.emit('new_message',{message: $('#message').val()});
//     return false;
//   })
//   socket.on('post_new_message',function(data){
//     console.log(data);
//     $('#message_log').append('<p>' + data.new_message + '</p>');
//   })
//
// })
