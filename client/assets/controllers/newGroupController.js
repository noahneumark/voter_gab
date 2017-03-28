app.controller('NewGroupController', ['$scope', '$routeParams', 'UserFactory', 'GroupFactory', function($scope, $routeParams, UserFactory, GroupFactory) {
  $scope.addGroup = function(group) {
    GroupFactory.newGroup(group);
  }
}]);
