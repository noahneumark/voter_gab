app.controller('DashboardController', ['$scope', '$routeParams', '$location', 'UserFactory', 'GroupFactory', 'EndorsementFactory', function($scope, $routeParams, $location, UserFactory, GroupFactory, EndorsementFactory) {
  function getCurrentUser() {
    UserFactory.currentUser(function(user) {
      $scope.currentUser = user;
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
  function getEndorsements() {
    EndorsementFactory.getGroupsEndorsements(function(user) {
      $scope.userEndorsements = user;
    })
  }
  function getFinalizedEndorsements() {
    EndorsementFactory.getFinalizedEndorsements(function(endorsements) {
      $scope.finalizedEndorsements = endorsements;
    })
  }
  getFinalizedEndorsements();
  getCurrentUser();
  getUserFollows();
  getUserMemberships();
  getUserAdmins();
  getEndorsements();
  $scope.follow = function(id) {
    GroupFactory.follow(id);
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
}]);
