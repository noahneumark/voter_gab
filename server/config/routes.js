// require controllers
var endorsements = require('../controllers/endorsements.js');
var groups = require('../controllers/groups.js');
var users = require('../controllers/users.js');
var endorsements = require('../controllers/endorsements.js');


module.exports = function(app,server) {
  app.get('/users', users.index);
  app.post('/register', users.register);
  app.post('/login', users.login);
  app.get('/logout', users.logout);
  app.get('/current', users.current);
  app.get('/groups', groups.index);
  app.post('/groups', groups.create);
  app.get('/groups/following', groups.following);
  app.get('/groups/memberships', groups.memberships);
  app.get('/groups/admins', groups.admins);
  app.put('/groups/:id/follow', groups.follow);
  app.get('/groups/:id/followers', groups.getFollowers);
  app.get('/groups/:id/members', groups.getMembers);
  app.put('/groups/:id/unfollow', groups.unfollow);
  app.get('/groups/:id', groups.show);
  app.post('/endorsements', endorsements.get);
  app.get('/endorsements/finalized', endorsements.index);
  app.put('/endorsements/:id/yea', endorsements.voteYea);
  app.put('/endorsements/:id/nay', endorsements.voteNay);
  app.put('/endorsements/:id/finalize', endorsements.finalize);
  app.get('/endorsements', endorsements.getGroupsEndorsements);
  app.post('/groups/endorsements/:id/propose', endorsements.propose);
  app.get('/groups/measure/:id', groups.getMeasureDetails);
  app.put('/groups/:g_id/members/:f_id/add', groups.addMember);
  app.put('/groups/:g_id/admins/:m_id/add', groups.addAdmin);
}
