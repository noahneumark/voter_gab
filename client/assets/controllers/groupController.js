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
      show(groupId);
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
      var adminList = [];
      for (var i in user.admin){
        adminList.push(user.admin[i]._id);
      }
      console.log(adminList);
      $scope.adminList = adminList;
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
    var votesNeeded = 0;
    var voteCount = endorsement.upvotes.length + endorsement.downvotes.length;
    votesNeeded = Math.ceil($scope.group.quorum * $scope.group.members.length) - (voteCount);
    console.log($scope.group.quorum);
    console.log($scope.group.members.length);
    console.log($scope.group.quorum);
    if (votesNeeded < 0) {
      return 0;
    }
    else {
      return votesNeeded;
    }
  }
  $scope.getMeasureDetails = function(id) {
    GroupFactory.getMeasureDetails(id, function(measure){
      $scope.measureDetail = measure;
    })
  }
  $scope.finalize = function(id) {
    EndorsementFactory.finalizeEndorsement(id, function() {
      console.log('finalized');
    })
  }
  getUserFollows();
  getUserMemberships();
  getUserAdmins();
}]);
