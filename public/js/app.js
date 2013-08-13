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
}).run(function ($rootScope) {
    // Async load Facebook for logging in.
    window.fbAsyncInit = function () {
        FB.init({
            appId:'518725944867414',
            status:true,
            cookie:true,
            xfbml:true
        });
    };

    (function (d) {
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement('script');
        js.id = id;
        js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        ref.parentNode.insertBefore(js, ref);
    }(document));

});
