app.controller('APIController', ['$scope', '$routeParams', 'UserFactory', 'APIFactory', function($scope, $routeParams, UserFactory, APIFactory) {
  function getCurrentUser() {
    UserFactory.currentUser(function(user) {
      $scope.currentUser = user;
    })
  }
  getCurrentUser();
  function callAPI(){
        APIFactory.callAPI(function(data){
            $scope.APIdata = data;
        });
    }
    callAPI();
}]);
