app.controller('HomeController', ['$scope', '$routeParams', 'EndorsementFactory', function($scope, $routeParams, EndorsementFactory) {
  function getEndorsements() {
    EndorsementFactory.getFinalizedEndorsements(function(endorsements) {
      $scope.endorsements = endorsements;
    })
  }
  getEndorsements();
}]);
