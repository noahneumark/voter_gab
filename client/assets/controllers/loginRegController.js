app.controller('LoginRegController', ['$scope', '$routeParams', 'UserFactory', function($scope, $routeParams, UserFactory) {
  $scope.addUser = function(user) {
    UserFactory.newUser(user);
  }
  $scope.userLogin = function(user) {
    UserFactory.login(user);
  }
}]);
