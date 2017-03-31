var mongoose = require('mongoose');
var Group = mongoose.model('Group');
var User = mongoose.model('User');
var Chat = mongoose.model('Chat');

module.exports = {
  grouptoroom : function(callback){
    Group.find({},function(err,data){
      for(var i=0;i<data.length;i++){
        callback(data[i]._id);
      }
    })
  },
  addmessage : function(data,callback){
    var the_group = data.c_group;
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
        callback(data);
      })
    },

  }
