app.factory('EndorsementFactory', ['$location', '$http', function($location, $http) {
  var factory = {};
  factory.newEndorsement = function(endorsement) {
    $http({
      url: '/endorsements',
      method: 'POST',
      data: endorsement
    }).then(function(res) {
      console.log('da res data is dis dawg', res);
      $location.url('/dashboard');
    }, function(res) {
      console.log(res);
    })
  }
  return factory;
}])
