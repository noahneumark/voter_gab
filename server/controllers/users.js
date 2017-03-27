var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
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
    User.findOne({email: req.body.email}, function(err, data) {
      if (data == null) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash;
        var user = new User(req.body);
        user.save(function(err, data) {
          if (err) {
            res.status(400).send('User was not saved into the database');
          }
          else {
            req.session.user = data;
            res.sendStatus(200, 'Registration successful');
          }
        })
      }
      else {
        res.status(400).send('User already exists');
      }
    })
  },
  login: function(req, res) {
    User.findOne({email: req.body.email}, function(err, user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        req.session.user = user;
        res.sendStatus(200, 'Login successful');
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
