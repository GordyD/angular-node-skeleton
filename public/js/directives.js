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

      function formatGeoInfo(place) {
        var geoInfo = { name: place.formatted_address, lat: place.geometry.location.mb, lon: place.geometry.location.nb }
        for(var i = 0; i < place.address_components.length; i++) {
          var countryIndex = place.address_components[i].types.indexOf('country');
          var countyIndex = place.address_components[i].types.indexOf('administrative_area_level_3');
          var regionIndex = place.address_components[i].types.indexOf('administrative_area_level_1');
          var cityIndex = place.address_components[i].types.indexOf('locality');
          if(countryIndex != -1) {
            geoInfo.country = place.address_components[i].long_name;
          } else if (countyIndex != -1) {
            geoInfo.county = place.address_components[i].long_name;
          } else if (regionIndex != -1) {
            geoInfo.region = place.address_components[i].long_name;
          } else if (cityIndex != -1) {
            geoInfo.city = place.address_components[i].long_name;
          }
        }
        return geoInfo;
      }

    	google.maps.event.addListener(autocomplete, 'place_changed', function() {
      		var place = autocomplete.getPlace();
      		scope.form.destination = place.formatted_address;
          scope.form.geoinfo = formatGeoInfo(place);
    	});
  	}
  });
