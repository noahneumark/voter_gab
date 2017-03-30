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
  getUserAdmins();
}]);
