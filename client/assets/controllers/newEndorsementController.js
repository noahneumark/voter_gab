app.controller('NewEndorsementController', ['$scope', '$routeParams', 'EndorsementFactory', function($scope, $routeParams, EndorsementFactory) {
  $scope.getEndorsements = function(endorsements) {
    $scope.state = endorsements.state;
    EndorsementFactory.getEndorsements(endorsements, function(data) {
      $scope.data = data;
    })
  }
  $scope.propose = function(title, measureId) {
    var endorsement = {};
    endorsement.title = title;
    endorsement.measureId = measureId;
    console.log('scope state', $scope.state);
    endorsement.state = $scope.state;
    EndorsementFactory.proposeEndorsement($routeParams.id, endorsement);
  }
}]);
