app.factory('GroupFactory', ['$location', '$http', function($location, $http) {
  var factory = {};
  factory.getGroup = function(id, callback) {
    $http({
      url: '/groups/' + id,
      method: 'GET'
    }).then(function(res) {
      callback(res.data);
    })
  }
  factory.getGroups = function(callback) {
    $http({
      url: '/groups',
      method: 'GET'
    }).then(function(res) {
      callback(res.data);
    })
  }
  factory.newGroup = function(group) {
    $http({
      url: '/groups',
      method: 'POST',
      data: group
    }).then(function(res) {
      console.log('successfully created group');
      $location.url('/dashboard');
    }, function(res) {
      console.log(res);
    })
  }
  factory.follow = function(id) {
    $http({
      url: '/groups/' + id + '/follow',
      method: 'PUT'
    }).then(function(res) {
      console.log(res);
      $location.url('/groups/show/' + id);
    })
  }
  return factory;
}])
