var app = angular.module('app', ['ngRoute', 'ngMessages']);
app.config(function($routeProvider) {
  $routeProvider
  //.when('/', {
  //   templateUrl: 'partials/home.html',
  //   controller: 'HomeController'
  // })
    .when('/', {
      //.when('/login', {
      templateUrl: 'partials/loginReg.html',
      controller: 'LoginRegController'
    })
    .when('/dashboard', {
      templateUrl: 'partials/dashboard.html',
      controller: 'DashboardController'
    })
    .when('/groups/new', {
      templateUrl: 'partials/newGroup.html',
      controller: 'NewGroupController'
    })
    .when('/groups/show/:id', {
      templateUrl: 'partials/group.html',
      controller: 'GroupController'
    })
    .otherwise({
      redirectTo: '/'
    })
})
