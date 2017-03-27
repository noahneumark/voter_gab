var app = angular.module('app', ['ngRoute', 'ngMessages']);
app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/loginReg.html',
      controller: 'LoginRegController'
    })
    .when('/dashboard', {
      templateUrl: 'partials/dashboard.html',
      controller: 'DashboardController'
    })
    .otherwise({
      redirectTo: '/'
    })
})
