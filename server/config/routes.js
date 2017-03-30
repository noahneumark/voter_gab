// require controllers
var endorsements = require('../controllers/endorsements.js');
var groups = require('../controllers/groups.js');
var users = require('../controllers/users.js');
var chat = require('../controllers/chatcontroller.js');
var endorsements = require('../controllers/endorsements.js');


module.exports = function(app,server) {
  app.get('/users', users.index);
  app.post('/register', users.register);
  app.post('/login', users.login);
  app.get('/logout', users.logout);
  app.get('/current', users.current);
  app.get('/groups', groups.index);
  app.post('/groups', groups.create);
  app.get('/groups/following', groups.following);
  app.get('/groups/memberships', groups.memberships);
  app.get('/groups/admins', groups.admins);
  app.put('/groups/:id/follow', groups.follow);
  app.get('/groups/:id/followers', groups.getFollowers);
  app.put('/groups/:id/unfollow', groups.unfollow);
  app.get('/groups/:id', groups.show);
  app.post('/endorsements', endorsements.get);
  app.put('/endorsements/:id/yea', endorsements.voteYea);
  app.put('/endorsements/:id/nay', endorsements.voteNay);
  app.get('/endorsements', endorsements.getGroupsEndorsements);
  app.post('/groups/endorsements/:id/propose', endorsements.propose);
  app.put('/groups/:g_id/members/:f_id/add', groups.addMember);


  //SOCKETS
  var messages = [];
  var gmessages = [];
  var groupRoom = [];
  var io = require('socket.io').listen(server);
  // var clients = [];
  // socket listening to connections
  io.on('connection',function(socket){
    var defaultRoom = 'lobby';
      socket.on('new_message',function(data){
        messages.unshift(data);
        // console.log("***************************** IO CONNECTED *****************************");
          io.in(socket.room).emit("post_new_message",{new_message:data.message,user:data.c_user});
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
          // console.log("gmessg",gmessagesx);
          io.in(socket.room).emit("group_post_new_message",{new_message:gmessagesx});
          // setTimeout(send,3000);
        });
        // chat.grabmssg(data,function(data){
        //   // console.log(data);
        //   gmessagesx = data;
        //   //  console.log(gmessagesx);
        //   // console.log("done");
        //   //io.in(socket.room).emit("group_post_new_message",{new_message:gmessagesx});
        //   setTimeout(send,3000);
        // });
        // io.in(socket.room).emit("group_post_new_message",{new_message:data});
        // // console.log(data);
        // var group_is = data.c_group;
        // var gmessagesx = [];
        // console.log("currect room",socket.room);
        // socket.join(data.c_group);
        // chat.grouptoroom(function(groupIDs){
        //   groupRoom.push(groupIDs);
        //   // console.log(groupRoom);
        // });
        // chat.addmessage(data);
        // chat.grabmssg(data,function(data){
        //   // console.log(data);
        //   gmessagesx = data;
        //   // console.log(gmessagesx);
        //   // console.log("done");
        //   io.in(group_is).emit("group_post_new_message",{new_message:gmessagesx});
        // });
        })
      socket.on('ggrab_messages',function(data){
        var gmessagesx = [];
        chat.grabmssg(data,function(data){
          // console.log(data);
          gmessagesx = data;
          io.in(socket.room).emit("gload_messages",{message_list:gmessagesx});
          //  console.log(gmessagesx);
          // console.log("done");
          //io.in(socket.room).emit("group_post_new_message",{new_message:gmessagesx});
        });
      })
      socket.on('joingroup',function(data){
        socket.room = data.cur_group;
        socket.join(data.cur_group);
        // console.log(data);
      })
      socket.on('joinlobby',function(){
        socket.join(defaultRoom);
      })
  });
}
