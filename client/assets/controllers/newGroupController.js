app.controller('NewGroupController', ['$scope', '$routeParams', 'UserFactory', 'GroupFactory', function($scope, $routeParams, UserFactory, GroupFactory) {
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
      var adminList = [];
      for (var i in user.admin){
        adminList.push(user.admin[i]._id);
      }
      $scope.adminList = adminList;
      $scope.adminUser = user;
    })
  }
  $scope.addGroup = function(group) {
    GroupFactory.newGroup(group);
  }
  $scope.reset = function(){
      $scope.newGroup = {};
  }
  getUserFollows();
  getUserMemberships();
  getAllGroups();
  getCurrentUser();
  getUserAdmins();
}]);
