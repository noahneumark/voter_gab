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
  factory.yea = function(id, callback) {
    $http({
      url: '/endorsements/'+id+'/yea',
      method: 'PUT',
    }).then(function(res) {
      callback();
    })
  }
  factory.nay = function(id, callback) {
    $http({
      url: '/endorsements/'+id+'/nay',
      method: 'PUT',
    }).then(function(res) {
      callback();
    })
  }
  factory.finalizeEndorsement = function(id, callback) {
    $http({
      url: '/endorsements/'+id+'/finalize',
      method: 'PUT'
    }).then(function(res) {
      console.log('hey');
      callback();
    })
  }
  factory.getFinalizedEndorsements = function(callback) {
    $http({
      url: '/endorsements/finalized',
      method: 'GET'
    }).then(function(res) {
      callback(res.data);
    })
  }
  return factory;
}])
