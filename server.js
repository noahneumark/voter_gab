var express  = require( 'express' ),
    path     = require( 'path' ),
    bp       = require('body-parser'),
    session  = require('express-session'),
    request  = require('request'),
    root     = __dirname,
    port     = process.env.PORT || 8000,
    app      = express();

var sessionConfig = {
 secret:'CookieMonster', // Secret name for decoding secret and such
 resave:false, // Don't resave session if no changes were made
 saveUninitialized: true, // Don't save session if there was nothing initialized
 name:'myCookie', // Sets a custom cookie name
 cookie: {
  secure: false, // This need to be true, but only on HTTPS
  httpOnly:false, // Forces cookies to only be used over http
  maxAge: 360000000
 }
}

app.use( express.static( path.join( root, 'client' )));
app.use( express.static( path.join( root, 'bower_components' )));
app.use( bp.json() );
app.use(session(sessionConfig));

require('./server/config/mongoose.js');

var server = app.listen( port, function() {
  console.log( `server running on port ${ port }` );
});
var messages = [];
require('./server/config/routes.js')(app,server);
var chat = require('./server/controllers/chatcontroller.js');
//SOCKETS
var messages = [];
var gmessages = [];
var groupRoom = [];
var io = require('socket.io').listen(server);
// socket listening to connections
io.on('connection',function(socket){
  console.log('connected');
  var defaultRoom = 'lobby';
    socket.on('new_message',function(data){
      messages.push(data);
      // console.log("***************************** IO CONNECTED *****************************");
        // io.in(socket.room).emit("post_new_message",{new_message:data.message,user:data.c_user});
        io.in(socket.room).emit("load_messages",{message_list:messages});
      })
    socket.on('grab_messages',function(){
      socket.room = defaultRoom;
      socket.join(defaultRoom);
      socket.emit("load_messages",{message_list:messages});
    })
    socket.on('group_new_message',function(data){
      // console.log(data);
      var gmessagesx = [];
      chat.addmessage(data,function(datax){
        gmessagesx = datax;
        io.in(socket.room).emit("group_post_new_message",{new_message:gmessagesx});
      });
      })
    socket.on('ggrab_messages',function(data){
      var gmessagesx = [];
      chat.grabmssg(data,function(data){
        gmessagesx = data;
        io.in(socket.room).emit("gload_messages",{message_list:gmessagesx});
      });
    })
    socket.on('joingroup',function(data){
      socket.leave(socket.room);
      socket.room = data.cur_group;
      socket.join(data.cur_group);
    })
    socket.on('joinlobby',function(){
      socket.leave(socket.room);
      var defaultRoom = 'lobby';
      socket.join(defaultRoom);
    })
});
