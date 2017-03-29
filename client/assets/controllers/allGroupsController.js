app.controller('AllGroupsController', ['$scope', '$routeParams', 'GroupFactory', 'UserFactory', function($scope, $routeParams, GroupFactory, UserFactory) {
  function getAllGroups() {
    GroupFactory.getAllGroups(function(groups) {
      $scope.groups = groups;
    })
  }
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
  getUserFollows();
  getUserMemberships();
  getAllGroups();
  getCurrentUser();
  getUserAdmins();
  $scope.follow = function(id) {
    GroupFactory.follow(id);
  }
  $scope.unfollow = function(id) {
    GroupFactory.unfollow(id);
  }
}]);
