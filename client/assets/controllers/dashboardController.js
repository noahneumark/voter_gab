app.controller('DashboardController', ['$scope', '$routeParams', 'UserFactory', 'GroupFactory', function($scope, $routeParams, UserFactory, GroupFactory) {
  function getCurrentUser() {
    UserFactory.currentUser(function(user) {
      console.log('does this work');
      $scope.currentUser = user;
    })
  }
  function getGroups() {
    GroupFactory.getGroups(function(groups) {
      console.log('the groups', groups);
      $scope.groups = groups;
    })
  }
  getCurrentUser();
  getGroups();
  $scope.follow = function(id) {
    GroupFactory.follow(id);
  }
}]);
