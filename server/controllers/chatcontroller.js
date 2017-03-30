var mongoose = require('mongoose');
var Group = mongoose.model('Group');
var User = mongoose.model('User');
var Chat = mongoose.model('Chat');
// var messages = [];
// var clients = [];
// var io = require('socket.io');

module.exports = {
  grouptoroom : function(callback){
    Group.find({},function(err,data){
      for(var i=0;i<data.length;i++){
        // console.log(data[i]._id);
        callback(data[i]._id);
      }
    })
  },
  addmessage : function(data){
    // messages.push(d)
    // console.log("CHAT CONTROLLER ******* ",data);
    // messages.unshift(data);
    // console.log(messages);
    // console.log("***************************** IO CONNECTED *****************************");
    var chat = new Chat({user:data.c_userid,message:data.message,_group:data.c_group});
    // console.log(chat);
    chat.save(function(err,data){
      if(err){
        console.log(err);
      }
    });
    },
    grabmssg : function(data,callback){
      Chat.find({_group:data.c_group}).populate('user').exec(function(err,data){
        if(err){
          console.log(err);
        }
        // for(var i = 0; i < data.length; i++){
        //   callback({sentby:data[i].user.name,message:data[i].message});
        // }
        callback(data);
      })
    },

  }
