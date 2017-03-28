app.controller('DashboardController', ['$scope', '$routeParams', 'UserFactory', 'GroupFactory', function($scope, $routeParams, UserFactory, GroupFactory) {
  function getCurrentUser() {
    UserFactory.currentUser(function(user) {
      console.log('does this work');
      $scope.currentUser = user;
    })
  }
  function getUserFollows() {
    GroupFactory.getFollowingGroups(function(user) {
      console.log('the user', user);
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
      console.log('user in groupfactory', user);
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
