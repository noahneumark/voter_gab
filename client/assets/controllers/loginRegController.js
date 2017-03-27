app.controller('LoginRegController', ['$scope', '$routeParams', 'UserFactory', function($scope, $routeParams, UserFactory) {
  $scope.addUser = function(user) {
    console.log('new user in loginreg controller', user);
    UserFactory.newUser(user);
  }
  $scope.userLogin = function(user) {
    console.log('existing user in loginreg controller', user);
    UserFactory.login(user);
  }
}]);
