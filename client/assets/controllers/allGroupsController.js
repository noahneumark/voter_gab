app.controller('AllGroupsController', ['$scope', '$routeParams', '$location', 'GroupFactory', 'UserFactory', function($scope, $routeParams, $location, GroupFactory, UserFactory) {
  function getAllGroups() {
    GroupFactory.getAllGroups(function(groups) {
      $scope.groups = groups;
    })
  }
  function getCurrentUser() {
    UserFactory.currentUser(function(user) {
      $scope.currentUser = user;
      console.log($scope.currentUser);
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
  getUserFollows();
  getUserMemberships();
  getAllGroups();
  getCurrentUser();
  getUserAdmins();

  $scope.follow = function(id) {
    GroupFactory.follow(id);
    getCurrentUser();
  }
  $scope.unfollow = function(id) {
    GroupFactory.unfollow(id, function() {
      getCurrentUser();
      $location.url('/dashboard');
    })
  }
}]);
