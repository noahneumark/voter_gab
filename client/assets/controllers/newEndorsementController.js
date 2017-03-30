app.controller('NewEndorsementController', ['$scope', '$routeParams', 'EndorsementFactory', 'UserFactory', function($scope, $routeParams, EndorsementFactory, UserFactory) {
    function getCurrentUser() {
      UserFactory.currentUser(function(user) {
        $scope.currentUser = user;
      })
    }
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
    endorsement.state = $scope.state;
    EndorsementFactory.proposeEndorsement($routeParams.id, endorsement);
  }
  $scope.reset = function(){
      $scope.newEndorsement={};
  }
  getCurrentUser();
}]);
