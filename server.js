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
var clients = [];
var io = require('socket.io').listen(server);
require('./server/config/routes.js')(app,server);
// socket listening to connections
io.on('connection',function(socket){
  var connected_user = {socket_id:socket.id}
  console.log(connected_user);
    clients.push(connected_user);
    console.log("CLIENTS : ",clients);
    socket.on('new_message',function(data){
      // messages.push(d)
      messages.unshift(data);
      // console.log(messages);
      console.log("***************************** IO CONNECTED *****************************");
      io.emit("post_new_message",{new_message:data.message,user:data.c_user});
    })
    socket.on('grab_messages',function(){
      socket.emit("load_messages",{message_list:messages});
    })
});
