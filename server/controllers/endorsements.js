var mongoose = require('mongoose');
var request = require('request');
var Endorsement = mongoose.model('Endorsement');

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
  get: function(req, res) {
    request('http://api.votesmart.org/Measure.getMeasuresByYearState?key=2f03c2e306be0364519648e3878b6336&year='+req.body.year+'&stateId='+req.body.state+'&o=JSON', function(error, response, body) {
      var contents = JSON.parse(body);
      res.json(contents);
    })
  },
  propose: function(req, res) {
    console.log('propose req body', req.body);
  }
}
