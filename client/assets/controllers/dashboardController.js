app.controller('DashboardController', ['$scope', '$routeParams', 'UserFactory', 'GroupFactory', 'EndorsementFactory', function($scope, $routeParams, UserFactory, GroupFactory, EndorsementFactory) {
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
      $scope.adminUser = user;
    })
  }
  function getEndorsements() {
    EndorsementFactory.getGroupsEndorsements(function(user) {
      $scope.userEndorsements = user;
      console.log('users endorsements', $scope.userEndorsements);
    })
  }
  getCurrentUser();
  getUserFollows();
  getUserMemberships();
  getUserAdmins();
  getEndorsements();
  $scope.follow = function(id) {
    GroupFactory.follow(id);
  }
}]);
