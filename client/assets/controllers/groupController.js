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
    })
  }
  getUser();
  $scope.grouped = false;
  function groupCheck(){
      UserFactory.currentUser(function(c_user){
        $scope.c_user = c_user;
        for(var i = 0; i < $scope.c_user.memberships.length;i++){
          if($scope.c_user.memberships[i] == $routeParams.id){
            $scope.grouped = true;
            break;
          }else{
            console.log('Not in group');
          }
        }
      })
    }
    groupCheck();
}]);
