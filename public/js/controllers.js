'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('IndexController', function ($scope, $http) {
    $http.get('/api/trips').
    success(function (data, status, headers, config) {
      $scope.trips = data.trips;
    });

  }).
  controller('NewTripController', function ($scope, $http, $location) {
    $scope.form = {};
    $scope.createTrip = function () {
      $http.post('api/trips', $scope.form).
      success(function (data) {
        $location.path('/');
      })
    };
  }).
  controller('ViewTripController', function ($scope, $http, $routeParams) {
    $http.get('/api/trips/'+$routeParams.id).
    success(function (data) {
      $scope.trip = data.trip;
    });

  }).
  controller('EditTripController', function ($scope, $http, $location, $routeParams) {
    $scope.form = {};
    $http.get('/api/trips/'+$routeParams.id).
    success(function (data) {
      $scope.form = data.trip;
    });

    $scope.updateTrip = function () {
      $http.put('api/trips/'+$routeParams.id, $scope.form).
      success(function (data) {
        $location.url('/trip/view/'+$routeParams.id);
      });
    }
  }).
  controller('DeleteTripController', function ($scope, $http, $location, $routeParams) {
      $http.get('api/trips/'+$routeParams.id).
      success(function(data) {
        $scope.trip = data.trip;
      });

      $scope.deleteTrip = function() {
        $http.delete('api/trips/'+$routeParams.id).
        success(function(data) {
          $location.url('/');
        });
      };

      $scope.home = function () {
        $location.url('/');
      };
  });
