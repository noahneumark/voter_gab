app.factory('EndorsementFactory', ['$location', '$http', function($location, $http) {
  var factory = {};
  factory.getEndorsements = function(endorsements, callback) {
    $http({
      url: '/endorsements',
      method: 'POST',
      data: endorsements
    }).then(function(res) {
      callback(res.data);
    }, function(res) {
      console.log(res);
    })
  }
  factory.proposeEndorsement = function(id, endorsement) {
    $http({
      url: '/groups/endorsements/'+id+'/propose',
      method: 'POST',
      data: endorsement
    }).then(function(res) {
      $location.url('/groups/show/'+id);
    })
  }
  factory.getGroupsEndorsements = function(callback) {
    $http({
      url: '/endorsements',
      method: 'GET',
    }).then(function(res) {
      callback(res.data);
    })
  }
  return factory;
}])
