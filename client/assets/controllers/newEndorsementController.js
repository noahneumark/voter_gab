app.controller('NewEndorsementController', ['$scope', '$routeParams', 'EndorsementFactory', function($scope, $routeParams, EndorsementFactory) {
  $scope.addEndorsement = function(endorsement) {
    EndorsementFactory.newEndorsement(endorsement);
  }
}]);
