var mongoose = require('mongoose');
var request = require('request');
var Endorsement = mongoose.model('Endorsement');
var Group = mongoose.model('Group');
var User = mongoose.model('User');

module.exports = {
  index: function(req, res) {
    Endorsement.find({}).populate('_group').exec(function(err, endorsements) {
      if (err) {
        res.status(400).send('Fuuuck');
      }
      else {
        res.json(endorsements);
      }
    })
  },
  getGroupsEndorsements: function(req, res) {
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
    //Group.findOne({_id: req.params.id}, function(err, group) {
    Group.findOne({_id: req.params.id}).populate('endorsements').exec(function(err, group) {
      var found = false;
      for (var i in group.endorsements) {
        if (group.endorsements[i].measureId == req.body.measureId) {
          found = true;
        }
      }
      if (found == false) {
        var endorsement = new Endorsement(req.body);
        endorsement._group = req.params.id;
        group.endorsements.push(endorsement._id);
        endorsement.save(function(err) {
          group.save(function(err) {
            if (err) {
              res.status(400).send("YOU FUCKED UP LOL");
            }
            else {
              res.sendStatus(200, "AYYYYYYYYYY wus gucci");
            }
          })
        })
      }
      else {
        res.status(400).send('You are already endorsing this endorsement');
      }
      //console.log('group endorsements', group.endorsements);
      //var endorsement = new Endorsement(req.body);
      //endorsement._group = req.params.id;
      //group.endorsements.push(endorsement._id);
      //endorsement.save(function(err) {
      //  group.save(function(err) {
      //    if (err) {
      //      res.status(400).send("You dun goof'd");
      //    }
      //    else {
      //      res.sendStatus(200, 'YASSS');
      //    }
      //  })
      //})
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
  },
  finalize: function(req, res) {
    Endorsement.findOne({_id: req.params.id}, function(err, endorsement) {
      if (err) {
        res.status(400).send('Could not fetch endorsement');
      }
      else {
        if (endorsement.upvotes.length > endorsement.downvotes.length) {
          endorsement.update({$set: {status: 'Yea'}}, function(err) {
            if (err) {
              res.status(400).send('Endorsement got fucked up');
            }
            else {
              res.sendStatus(200);
            }
          })
        }
        else if (endorsement.downvotes.length > endorsement.upvotes.length) {
          endorsement.update({$set: {status: 'Nay'}}, function(err) {
            if (err) {
              res.status(400).send('Endorsement got fucked up');
            }
            else {
              res.sendStatus(200);
            }
          })
        }
        else {
          endorsement.update({$set: {status: 'Neutral'}}, function(err) {
            if (err) {
              res.status(400).send('Endorsement got fucked up');
            }
            else {
              res.sendStatus(200);
            }
          })
        }
      }
    })
  }
}
