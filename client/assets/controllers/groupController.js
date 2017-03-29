app.controller('GroupController', ['$scope', '$routeParams', '$location', 'GroupFactory', function($scope, $routeParams, $location, GroupFactory) {
  function show(id) {
    GroupFactory.getGroup(id, function(group) {
      $scope.group = group;
    })
  }
  show($routeParams.id);
  $scope.newEndorsement = function(id) {
    $location.url('/groups/'+id+'/endorsements/new')
  }
}]);
