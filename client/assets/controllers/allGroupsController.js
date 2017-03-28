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
  getAllGroups();
  getCurrentUser();
  $scope.follow = function(id) {
    GroupFactory.follow(id);
  }
  $scope.unfollow = function(id) {
    GroupFactory.unfollow(id);
  }
}]);
