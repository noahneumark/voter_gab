var mongoose = require('mongoose');
var Group = mongoose.model('Group');
var User = mongoose.model('User');
var request = require('request');

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
    User.findOne({_id: req.session.user._id}).deepPopulate('following').exec(function(err, data) {
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
    Group.findOne({_id: req.params.id}).populate('admins').populate('members').populate('followers').exec(function(err, group) {
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
          group.followers.push(req.session.user._id);
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
  },
  unfollow: function(req, res) {
    Group.update({_id: req.params.id}, {$pull: {followers: req.session.user._id}}, function(err, group) {
      if (err) {
        res.status(400).send('Could not update group');
      }
      else {
        User.update({_id: req.session.user._id}, {$pull: {following: req.params.id}}, function(err, user) {
          if (err) {
            res.status(400).send('Could not update user');
          }
          else {
            res.sendStatus(200, 'User successfully unfollow group');
          }
        })
      }
    })
  },
  getFollowers: function(req, res) {
    Group.findOne({_id: req.params.id}).populate('followers').exec(function(err, data) {
      if (err) {
        res.status(400).send('Could not fetch group');
      }
      else {
        res.json(data);
      }
    })
  },
  getMeasureDetails: function(req, res){
    request('http://api.votesmart.org/Measure.getMeasure?key=2f03c2e306be0364519648e3878b6336&measureId='+req.params.id+'&o=JSON', function(error, response, body) {
      var contents = JSON.parse(body);
      res.json(contents);
    })
  },
  addMember: function(req, res) {
    Group.findOne({_id: req.params.g_id}, function(err, group) {
      User.findOne({_id: req.params.f_id}, function(err, user) {
        user.memberships.push(group._id);
        user.save(function(err) {
        })
      })
    })
  }
}
