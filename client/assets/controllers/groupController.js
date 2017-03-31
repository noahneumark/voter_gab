app.controller('GroupController', ['$scope', '$routeParams', '$location', '$window', 'GroupFactory', 'UserFactory', 'EndorsementFactory', function($scope, $routeParams, $location, $window, GroupFactory, UserFactory, EndorsementFactory) {
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
  function getMembers(id) {
    GroupFactory.getMembers(id, function(members) {
      $scope.groupMembers = members.members;
    })
  }
  $scope.pendingEndorsements = function(groupId) {
    //Endorsement
  }
  getMembers($routeParams.id);
  getFollowers($routeParams.id);
  getCurrentUser();
  show($routeParams.id);
  $scope.newEndorsement = function(id) {
    $location.url('/groups/'+id+'/endorsements/new')
  }
  function getUser(){
    UserFactory.currentUser(function(c_user){
      $scope.c_user = c_user;
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
      getMembers($routeParams.id);
    })
  }
  $scope.addAdmin = function(memberId, groupId) {
    GroupFactory.newAdmin(memberId, groupId, function() {
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
      $scope.adminList = adminList;
      $scope.adminUser = user;
    })
  }
  $scope.voteYea = function(id) {
    EndorsementFactory.yea(id, function() {
      $location.url('#!/groups/show/' + $scope.group._id);
    });
  }
  $scope.voteNay = function(id) {
    EndorsementFactory.nay(id, function() {
      $location.url('#!/groups/show/' + $scope.group._id);
    });
  }
  $scope.votesNeeded = function(endorsement) {
    var votesNeeded = 0;
    var voteCount = endorsement.upvotes.length + endorsement.downvotes.length;
    votesNeeded = Math.ceil($scope.group.quorum * $scope.group.members.length) - (voteCount);
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
  $scope.finalize = function(id, g_id) {
    EndorsementFactory.finalizeEndorsement(id, function() {
      show(g_id);
    })
  }
  getUserFollows();
  getUserMemberships();
  getUserAdmins();
}]);
