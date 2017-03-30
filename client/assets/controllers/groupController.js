app.controller('GroupController', ['$scope', '$routeParams', '$location', 'GroupFactory','UserFactory', function($scope, $routeParams, $location, GroupFactory,UserFactory) {
  function show(id) {
    GroupFactory.getGroup(id, function(group) {
      $scope.group = group;
    })
  }
  show($routeParams.id);
  $scope.newEndorsement = function(id) {
    $location.url('/groups/'+id+'/endorsements/new')
  }
  function getUser(){
    UserFactory.currentUser(function(c_user){
      $scope.c_user = c_user;
      console.log($scope.c_user);
    })
  }
  getUser();

}]);
