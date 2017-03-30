app.controller('GroupController', ['$scope', '$routeParams', '$location', 'GroupFactory', 'UserFactory', function($scope, $routeParams, $location, GroupFactory, UserFactory) {
  function show(id) {
    GroupFactory.getGroup(id, function(group) {
      $scope.group = group;
    })
  }
  function getCurrentUser() {
    UserFactory.currentUser(function(user) {
      $scope.currentUser = user;
    })
  }
  function getFollowers(id) {
    GroupFactory.getFollowers(id, function(followers) {
      $scope.groupFollowers = followers.followers;
    })
  }
  getFollowers($routeParams.id);
  getCurrentUser();
  show($routeParams.id);
  $scope.newEndorsement = function(id) {
    $location.url('/groups/'+id+'/endorsements/new')
  }
  function getUser(){
    UserFactory.currentUser(function(c_user){
      $scope.c_user = c_user;
      console.log($scope.c_user);
    })
  }
  getUser();
  $scope.isMember = function(id, members) {
    for (var i in members) {
      if (members[i]._id == id) {
        return true;
      }
    }
    return false;
  }
  $scope.isAdmin = function(id, admins) {
    for (var i in admins) {
      if (admins[i]._id == id) {
        return true;
      }
    }
    return false;
  }
  $scope.addMember = function(id) {
    GroupFactory.newMember(id, function() {
      console.log('test');
    })
  }
  function getUserFollows() {
    GroupFactory.getFollowingGroups(function(user) {
      $scope.followUser = user;
    })
  }
  function getUserMemberships() {
    GroupFactory.getMembershipGroups(function(user) {
      $scope.memberUser = user;
    })
  }
  function getUserAdmins() {
    GroupFactory.getAdminsGroups(function(user) {
      $scope.adminUser = user;
    })
  }
  function getEndorsements() {
    EndorsementFactory.getGroupsEndorsements(function(user) {
      $scope.userEndorsements = user;
    })
  }
  getUserFollows();
  getUserMemberships();
  getUserAdmins();
}]);
