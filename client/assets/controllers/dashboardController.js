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
      $scope.adminUser = user;
    })
  }
  function getEndorsements() {
    EndorsementFactory.getGroupsEndorsements(function(user) {
      $scope.userEndorsements = user;
    })
  }
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
