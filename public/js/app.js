'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'myApp.services',
  'myApp.controllers',
  'myApp.filters',
  'myApp.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'partials/index',
      controller: 'IndexController'
    }).
    when('/message/:id', {
      templateUrl: 'partials/view',
      controller: 'ViewController'
    }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});
