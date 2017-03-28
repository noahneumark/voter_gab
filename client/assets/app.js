var app = angular.module('app', ['ngRoute', 'ngMessages']);
app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'HomeController'
    })
    .when('/login', {
      templateUrl: 'partials/loginReg.html',
      controller: 'LoginRegController'
    })
    .when('/dashboard', {
      templateUrl: 'partials/dashboard.html',
      controller: 'DashboardController'
    })
    .when('/api', {
      templateUrl: 'partials/api.html',
      controller: 'APIController'
    })
    .otherwise({
      redirectTo: '/'
    })
})
