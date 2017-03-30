app.controller('GroupController', ['$scope', '$routeParams', '$location', 'GroupFactory', 'UserFactory',function($scope, $routeParams, $location, GroupFactory, UserFactory) {
  function show(id) {
    GroupFactory.getGroup(id, function(group) {
      $scope.group = group;
    })
  }
  function getCurrentUser() {
    UserFactory.currentUser(function(user) {
      $scope.currentUser = user;
    })
  }
  show($routeParams.id);
  $scope.newEndorsement = function(id) {
    $location.url('/groups/'+id+'/endorsements/new')
  }
  getCurrentUser();
}]);
