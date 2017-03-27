app.factory('UserFactory', ['$location', '$http', function($location, $http) {
  var factory = {};
  factory.newUser = function(user) {
    console.log('user in factory', user);
    $http({
      url: '/register',
      method: 'POST',
      data: user
    }).then(function(res) {
      $location.url('/dashboard');
    }, function(res) {
      console.log(res);
    })
  }
  factory.login = function(user) {
    $http({
      url: '/login',
      method: 'POST',
      data: user
    }).then(function(res) {
      $location.url('/dashboard');
    }, function(res) {
      console.log(res);
    })
  }
  factory.currentUser = function(callback) {
    $http({
      url: '/current',
      method: 'GET'
    }).then(function(res) {
      callback(res.data);
    }, function(res) {
      $location.url('/');
      console.log(res);
    })
  }
  return factory;
}])
