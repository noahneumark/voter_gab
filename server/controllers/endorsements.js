var mongoose = require('mongoose');
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
  create: function(req, res) {
    console.log('Create method called in endorsements');
    console.log('the req.body', req.body);
    res.sendStatus(200);
  }
}
