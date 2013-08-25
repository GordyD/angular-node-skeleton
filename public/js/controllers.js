'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppController', function(Facebook, $scope, $rootScope, $http) {
    $scope.logged_in = false;
    $scope.login_details = {first_name: "", last_name: "", image_url :""};

    $rootScope.$on("fb_login_failed", function () {
        console.log("fb_login_failed");
    });
    $rootScope.$on("fb_logout_succeded", function () {
        console.log("fb_logout_succeded");
        $rootScope.id = "";
    });
    $rootScope.$on("fb_logout_failed", function () {
        console.log("fb_logout_failed!");
    });

    $http.get('/api/session').success(
        function(result) {
          $scope.logged_in = true;
          $scope.login_details = result;
        }
    );

    $rootScope.$on("fb_connected", function (event, args) {
        var params = {};

        function setLoginDetails(member) {
          $scope.logged_in = true;
          $scope.login_details = member;
        };

        function authenticateViaFacebook(parameters) {
            $http.get('/api/members?facebook_id='+parameters.facebook_id).
            success(function(data) {
              if(data.members.length > 0) {
                $http.post('/api/login', {facebook_id: parameters.facebook_id}).success(
                  function (response) {
                    setLoginDetails(response);
                  }
                );
              } else {
                $http.post('/api/members', parameters).success(
                  function (response) {
                    $http.post('/api/login', {facebook_id: parameters.facebook_id}).success(
                      function (loginDetails) {
                        setLoginDetails(loginDetails);
                      }
                    );
                  }
                );
              }
            });
        }

        FB.api(
          {
              method:'fql.multiquery',
              queries:{
                  'q1':'SELECT uid, first_name, last_name, email FROM user WHERE uid = ' + args.facebook_id,
                  'q2':'SELECT url FROM profile_pic WHERE width=64 AND height=64 AND id = ' + args.facebook_id
              }
          },
          function (data) {
              params = {
                  facebook_id:data[0]['fql_result_set'][0].uid,
                  first_name:data[0]['fql_result_set'][0].first_name,
                  email: data[0]['fql_result_set'][0].email,
                  last_name:data[0]['fql_result_set'][0].last_name,
                  image_url:data[1]['fql_result_set'][0].url
              }
              authenticateViaFacebook(params);
          }
        );
    });

    $scope.login = function () {
        Facebook.login();
    };

    $scope.unsubscribe = function () {
        Facebook.unsubscribe();
    }

  }).
  controller('IndexController', function ($scope, $http) {
    $http.get('/api/trips').
    success(function (data, status, headers, config) {
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      data.trips.forEach(function(value, index, arr) {
        arr[index].month = months[value.month];
      });
      $scope.trips = data.trips;
    });
  }).
  controller('NewTripController', function ($scope, $http, $location) {
    $scope.form = {};
    $scope.currency = '$';
    $scope.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    $scope.years = ["2013", "2014", "2015"];
    $scope.createTrip = function () {
      $http.post('/api/trips', $scope.form).
      success(function (data) {
        $location.path('/');
      })
    };
  }).
  controller('ViewTripController', function ($scope, $http, $routeParams) {
    $http.get('/api/trips/'+$routeParams.id).
    success(function (data) {
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      data.trip.month = months[data.trip.month];
      $scope.trip = data.trip;
    });

  }).
  controller('EditTripController', function ($scope, $http, $location, $routeParams) {
    $scope.form = {};
    $http.get('/api/trips/'+$routeParams.id).
    success(function (data) {
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      data.trip.month = months[data.trip.month];
      $scope.trip = data.trip;
    });

    $scope.updateTrip = function () {
      $http.put('/api/trips/'+$routeParams.id, $scope.form).
      success(function (data) {
        $location.url('/trip/view/'+$routeParams.id);
      });
    }
  }).
  controller('DeleteTripController', function ($scope, $http, $location, $routeParams) {
      $http.get('/api/trips/'+$routeParams.id).
      success(function(data) {
        $scope.trip = data.trip;
      });

      $scope.deleteTrip = function() {
        $http.delete('/api/trips/'+$routeParams.id).
        success(function(data) {
          $location.url('/');
        });
      };

      $scope.home = function () {
        $location.url('/');
      };
  });
