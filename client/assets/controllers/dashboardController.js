app.controller('DashboardController', ['$scope', '$routeParams', 'UserFactory', function($scope, $routeParams, UserFactory) {
  function getCurrentUser() {
    UserFactory.currentUser(function(user) {
      $scope.currentUser = user;
    })
  }
  getCurrentUser();
}]);
