var mongoose = require('mongoose');
var request = require('request');
var Endorsement = mongoose.model('Endorsement');
var Group = mongoose.model('Group');
var User = mongoose.model('User');

module.exports = {
  index: function(req, res) {
    Endorsement.find({}, function(err, users) {
      if (err) {
        res.status(400).send('Cannot fetch users');
      }
      else {
        res.json(users);
      }
    })
  },
  getGroupsEndorsements: function(req, res) {
    // DP (deep populate)
    //User.find({_id: req.session.user._id}).deepPopulate('memberships.endorsements memberships.upvotes memberships.downvotes')
    User.findOne({_id: req.session.user._id}).deepPopulate('memberships.endorsements').exec(function(err, data) {
      if (err) {
        res.status(400).send('Could not fetch user');
      }
      else {
        res.json(data);
      }
    })
  },
  get: function(req, res) {
    request('http://api.votesmart.org/Measure.getMeasuresByYearState?key=2f03c2e306be0364519648e3878b6336&year='+req.body.year+'&stateId='+req.body.state+'&o=JSON', function(error, response, body) {
      var contents = JSON.parse(body);
      res.json(contents);
    })
  },
  propose: function(req, res) {
    Endorsement.findOne({measureId: req.body.measureId}, function(err, endorsement) {
      if (!endorsement) {
        var endorsement = new Endorsement(req.body);
        endorsement._group = req.params.id;
        Group.findOne({_id: req.params.id}, function(err, group) {
          group.endorsements.push(endorsement._id);
          endorsement.save(function(err) {
            group.save(function(err) {
              if (err) {
                res.status(400).send("You dun goof'd");
              }
              else {
                res.sendStatus(200);
              }
            })
          })
        })
      }
    })
  },
  voteYea: function(req, res) {
    Endorsement.findOne({_id: req.params.id}, function(err, endorsement) {
      if (err) {
        res.status(400).send('Could not fetch endorsement');
      }
      else {
        endorsement.upvotes.push(req.session.user._id);
        endorsement.save(function(err) {
          if (err) {
            res.status(400).send('Endorsement was not saved');
          }
          else {
            res.sendStatus(200);
          }
        })
      }
    })
  },
  voteNay: function(req, res) {
    Endorsement.findOne({_id: req.params.id}, function(err, endorsement) {
      if (err) {
        res.status(400).send('Could not fetch endorsement');
      }
      else {
        endorsement.downvotes.push(req.session.user._id);
        endorsement.save(function(err) {
          if (err) {
            res.status(400).send('Endorsement was not saved');
          }
          else {
            res.sendStatus(200);
          }
        })
      }
    })
  }
}
