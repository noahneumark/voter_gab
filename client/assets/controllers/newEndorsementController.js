app.controller('NewEndorsementController', ['$scope', '$routeParams', 'EndorsementFactory', 'UserFactory', 'GroupFactory', function($scope, $routeParams, EndorsementFactory, UserFactory, GroupFactory) {
    function getAllGroups() {
      GroupFactory.getAllGroups(function(groups) {
        $scope.groups = groups;
      })
    }
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
        var adminList = [];
        for (var i in user.admin){
          adminList.push(user.admin[i]._id);
        }
        $scope.adminList = adminList;
        $scope.adminUser = user;
      })
    }
    getUserFollows();
    getUserMemberships();
    getAllGroups();
    getCurrentUser();
    getUserAdmins();
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
}]);
