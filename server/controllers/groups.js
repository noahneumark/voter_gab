var mongoose = require('mongoose');
var Group = mongoose.model('Group');
var User = mongoose.model('User');

module.exports = {
  index: function(req, res) {
    Group.find({}, function(err, groups) {
      if (err) {
        res.status(400).send('Cannot fetch groups');
      }
      else {
        res.json(groups);
      }
    })
  },
  following: function(req, res) {
    User.findOne({_id: req.session.user._id}).populate('following').exec(function(err, data) {
      console.log('data in groups factory', data);
      if (err) {
        res.status(400).send('Could not fetch user data');
      }
      else {
        res.json(data);
      }
    })
  },
  memberships: function(req, res) {
    User.findOne({_id: req.session.user._id}).populate('memberships').exec(function(err, data) {
      if (err) {
        res.status(400).send('Could not fetch user data');
      }
      else {
        res.json(data);
      }
    })
  },
  admins: function(req, res) {
    User.findOne({_id: req.session.user._id}).populate('admin').exec(function(err, data) {
      if (err) {
        res.status(400).send('Could not fetch user data');
      }
      else {
        res.json(data);
      }
    })
  },
  create: function(req, res) {
    console.log('session user id', req.session.user._id);
    User.findOne({_id: req.session.user._id}, function(err, user) {
      if (err) {
        res.status(400).send('User not found');
      }
      else {
        Group.findOne({name: req.body.name}, function(err, group) {
          if (!group) {
            var group = new Group(req.body);
            group.admins.push(user._id);
            group.members.push(user._id);
            group.followers.push(user._id);
            group.save(function(err) {
              user.admin.push(group._id);
              user.memberships.push(group._id);
              user.following.push(group._id);
              user.save(function(err) {
                if (err) {
                  res.status(400).send('You tried to create a group but failed horribly. l2code');
                }
                else {
                  res.sendStatus(200, 'Group was created successfully');
                }
              })
            })
          }
          else {
            res.status(400).send('Group already exists');
          }
        })
      }
    })
  },
  show: function(req, res) {
    //Group.findOne({_id: req.params.id}, function(err, group) {
    Group.findOne({_id: req.params.id}).populate('admins').populate('members').populate('followers').exec(function(err, group) {
      console.log('group in server controller is', group);
      if (err) {
        res.status(400).send('Group not found');
      }
      else {
        res.json(group);
      }
    })
  },
  follow: function(req, res) {
    Group.findOne({_id: req.params.id}, function(err, group) {
      User.findOne({_id: req.session.user._id}, function(err, user) {
        user.following.push(group._id);
        user.save(function(err) {
          group.members.push(req.session.user._id);
          group.save(function(err) {
            if(err) {
              res.status(400).send('User did not follow group');
            }
            else {
              res.sendStatus(200, 'User is following group');
            }
          })
        })
      })
    })
  }
}
