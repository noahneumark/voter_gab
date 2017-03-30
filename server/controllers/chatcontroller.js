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
  addmessage : function(data,callback){
    // console.log("the data",data);
    var the_group = data.c_group;
    // console.log("***************************** IO CONNECTED *****************************");
    var chat = new Chat({user:data.c_userid,message:data.message,_group:data.c_group});
    chat.save(function(err,data){
      if(err){
        console.log(err);
      }else{
        Chat.find({_group:the_group}).populate('user').exec(function(err,data){
          if(err){
            console.log(err);
          }
          callback(data);
        })
      }
    });
    },
    grabmssg : function(data,callback){
      var the_group = data.cur_group;
      Chat.find({_group:the_group}).populate('user').exec(function(err,data){
        if(err){
          console.log(err);
        }
        // for(var i = 0; i < data.length; i++){
        //   callback({sentby:data[i].user.name,message:data[i].message});
        // }
        // console.log(data);
        callback(data);
      })
    },

  }
