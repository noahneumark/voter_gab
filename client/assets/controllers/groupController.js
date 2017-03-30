app.controller('GroupController', ['$scope', '$routeParams', '$location', 'GroupFactory', 'UserFactory', 'EndorsementFactory', function($scope, $routeParams, $location, GroupFactory, UserFactory, EndorsementFactory) {
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
  $scope.addMember = function(followerId, groupId) {
    GroupFactory.newMember(followerId, groupId, function() {
      $location.url('/dashboard');
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
  $scope.voteYea = function(id) {
    EndorsementFactory.yea(id, function() {
      $location.url('#!/dashboard');
    });
  }
  $scope.voteNay = function(id) {
    EndorsementFactory.nay(id, function() {
      $location.url('#!/dashboard');
    });
  }
  $scope.votesNeeded = function(endorsement) {
    console.log('threshold', endorsement.threshold);
    console.log('upvotes length', endorsement.upvotes.length);
    console.log('downvotes length', endorsement.downvotes.length);
    return (endorsement.threshold - (endorsement.upvotes.length + endorsement.downvotes.length));
  }
  getUserFollows();
  getUserMemberships();
  getUserAdmins();
}]);
