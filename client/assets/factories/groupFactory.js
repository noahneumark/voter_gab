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
  factory.getAllGroups = function(callback) {
    $http({
      url: '/groups',
      method: 'GET'
    }).then(function(res) {
      callback(res.data);
    })
  }
  factory.getMembershipGroups = function(callback) {
    $http({
      url: '/groups/memberships',
      method: 'GET'
    }).then(function(res) {
      callback(res.data);
    })
  }
  factory.getAdminsGroups = function(callback) {
    $http({
      url: '/groups/admins',
      method: 'GET'
    }).then(function(res) {
      callback(res.data);
    })
  }
  factory.getFollowingGroups = function(callback) {
    $http({
      url: '/groups/following',
      method: 'GET'
    }).then(function(res) {
      callback(res.data);
    })
  }
  factory.newGroup = function(group, callback) {
    $http({
      url: '/groups',
      method: 'POST',
      data: group
    }).then(function(res) {
      $location.url('/groups/show/'+res.data._id);
    }, function(res) {
      console.log(res);
    })
  }
  factory.follow = function(id) {
    $http({
      url: '/groups/' + id + '/follow',
      method: 'PUT'
    }).then(function(res) {
      $location.url('/groups/show/' + id);
    })
  }
  factory.unfollow = function(id, callback) {
    $http({
      url: '/groups/' + id + '/unfollow',
      method: 'PUT'
    }).then(function(res) {
      callback();
    })
  }
  factory.getFollowers = function(id, callback) {
    $http({
      url: '/groups/' + id + '/followers',
      method: 'GET'
    }).then(function(res) {
      callback(res.data);
    })
  }
  factory.getMembers = function(id, callback) {
    $http({
      url: '/groups/' + id + '/members',
      method: 'GET'
    }).then(function(res) {
      callback(res.data);
    })
  }
  factory.newMember = function(f_id, g_id, callback) {
    $http({
      url: '/groups/' + g_id + '/members/' + f_id + '/add',
      method: 'PUT'
    }).then(function(res) {
      callback();
    })
  }
  factory.newAdmin = function(m_id, g_id, callback) {
    $http({
      url: '/groups/' + g_id + '/admins/' + m_id + '/add',
      method: 'PUT'
    }).then(function(res) {
      callback();
    })
  }
  factory.getMeasureDetails = function(id, callback) {
    $http({
      url: '/groups/measure/' + id,
      method: 'GET'
    }).then(function(res){
      callback(res.data);
    })
  }
  return factory;
}])
