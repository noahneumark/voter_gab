app.controller('DashboardController', ['$scope', '$routeParams', 'UserFactory', 'GroupFactory', function($scope, $routeParams, UserFactory, GroupFactory) {
  
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
  getCurrentUser();
  getUserFollows();
  getUserMemberships();
  getUserAdmins();
  $scope.follow = function(id) {
    GroupFactory.follow(id);
  }
}]);
