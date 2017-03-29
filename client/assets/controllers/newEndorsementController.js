app.controller('NewEndorsementController', ['$scope', '$routeParams', 'EndorsementFactory', function($scope, $routeParams, EndorsementFactory) {
  $scope.getEndorsements = function(endorsements) {
    EndorsementFactory.getEndorsements(endorsements, function(data) {
      $scope.data = data;
    })
  }
  $scope.propose = function(title, measureCode) {
    console.log('group id', $routeParams.id);
    var endorsement = {};
    endorsement.title = title;
    endorsement.measureCode = measureCode;
    console.log('endorsement object', endorsement);
    EndorsementFactory.proposeEndorsement($routeParams.id, endorsement);
  }
}]);
