var express  = require( 'express' ),
    path     = require( 'path' ),
    bp       = require('body-parser'),
    session  = require('express-session'),
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
require('./server/config/routes.js')(app);

app.listen( port, function() {
  console.log( `server running on port ${ port }` );
});
