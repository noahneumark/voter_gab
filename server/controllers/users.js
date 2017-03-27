var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
  index: function(req, res) {
    User.find({}, function(err, data) {
      if (err) {
        res.status(400).send('Something went wrong');
      }
      else {
        res.json(data);
      }
    })
  },
  register: function(req, res) {
    User.findOne({name: req.body.name}, function(err, data) {
      if (data == null) {
        var user = new User(req.body);
        user.save(function(err, data) {
          if (err) {
            res.status(400).send('User already exists');
          }
          else {
            req.session.user = data;
            res.sendStatus(200, 'brand new user');
          }
        })
      }
    })
  },
  login: function(req, res) {
    User.findOne({$and: [{email: req.body.email}, {password: req.body.password}]}, function(err, data) {
      if (data) {
        req.session.user = data;
        res.sendStatus(200, 'logged in user');
      }
      else {
        res.status(400).send('Error logging in');
      }
    })
  },
  current: function(req, res) {
    if (req.session.user) {
      res.json(req.session.user);
    }
    else {
      res.status(401).send('No user in session');
    }
  },
  logout: function(req, res) {
    req.session.destroy();
    res.redirect('/');
  }
}
