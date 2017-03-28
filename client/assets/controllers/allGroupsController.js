app.controller('AllGroupsController', ['$scope', '$routeParams', 'GroupFactory', function($scope, $routeParams, GroupFactory) {
  function getAllGroups() {
    GroupFactory.getAllGroups(function(groups) {
      $scope.groups = groups;
    })
  }
  getAllGroups();
  $scope.follow = function(id) {
    GroupFactory.follow(id);
  }
}]);
