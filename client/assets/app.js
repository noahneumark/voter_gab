var app = angular.module('app', ['ngRoute', 'ngMessages']);
app.config(function($routeProvider) {
  $routeProvider
  //.when('/', {
  //   templateUrl: 'partials/home.html',
  //   controller: 'HomeController'
  // })
    .when('/', {
      //.when('/login', {
      templateUrl: 'partials/home.html',
      controller: 'HomeController'
    })
    .when('/login', {
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
    .when('/groups/all', {
      templateUrl: 'partials/allGroups.html',
      controller: 'AllGroupsController'
    })
    .when('/groups/show/:id', {
      templateUrl: 'partials/group.html',
      controller: 'GroupController'
    })
    .when('/groups/:id/endorsements/new', {
      templateUrl: 'partials/newEndorsement.html',
      controller: 'NewEndorsementController'
    })
    .otherwise({
      redirectTo: '/'
    })
})
