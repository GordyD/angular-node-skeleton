'use strict';

/* Directives */

angular.module('myApp.directives', []).
  directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  })
  .directive('locationLookup', function() {
  	return function(scope, element, attrs) {
    	var autocomplete = new google.maps.places.Autocomplete(element[0]);

    	google.maps.event.addListener(autocomplete, 'place_changed', function() {
      		var place = autocomplete.getPlace();
      		scope.form.destination =place.formatted_address;
      		console.log(element);
      		scope.form.geoinfo = { name: place.formatted_address, lat: place.geometry.location.mb, lon: place.geometry.location.nb};
    	});
  	}
  });
