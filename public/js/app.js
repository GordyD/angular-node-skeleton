'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'partials/index',
      controller: 'IndexController'
    }).
    when('/trip/new', {
      templateUrl: 'partials/newTrip',
      controller: 'NewTripController'
    }).
    when('/trip/view/:id', {
      templateUrl: 'partials/viewTrip',
      controller: 'ViewTripController'
    }).
    when('/trip/edit/:id', {
      templateUrl: 'partials/editTrip',
      controller: 'EditTripController'
    }).
    when('/trip/delete/:id', {
      templateUrl: 'partials/deleteTrip',
      controller: 'DeleteTripController'
    }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});
