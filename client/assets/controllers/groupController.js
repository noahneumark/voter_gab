app.controller('GroupController', ['$scope', '$routeParams', 'GroupFactory', function($scope, $routeParams, GroupFactory) {
  function show(id) {
    GroupFactory.getGroup(id, function(group) {
      $scope.group = group;
    })
  }
  show($routeParams.id);
}]);
