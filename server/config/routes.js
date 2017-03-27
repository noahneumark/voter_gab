// require controllers
var endorsements = require('../controllers/endorsements.js');
var groups = require('../controllers/groups.js');
var users = require('../controllers/users.js');

module.exports = function(app) {
  app.get('/users', users.index);
  app.post('/login', users.login);
  app.post('/register', users.register);
  app.get('/logout', users.logout);
  app.get('/current', users.current);
}
