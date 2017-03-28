// require controllers
var endorsements = require('../controllers/endorsements.js');
var groups = require('../controllers/groups.js');
var users = require('../controllers/users.js');

module.exports = function(app) {
  app.get('/users', users.index);
  app.post('/register', users.register);
  app.post('/login', users.login);
  app.get('/logout', users.logout);
  app.get('/current', users.current);
  app.get('/groups', groups.index);
  app.post('/groups', groups.create);
  app.get('/groups/following', groups.following);
  app.get('/groups/memberships', groups.memberships);
  app.put('/groups/:id/follow', groups.follow);
  app.get('/groups/:id', groups.show);
}
