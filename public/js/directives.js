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
        var geoInfo = { formatted: place.formatted_address, lat: place.geometry.location.mb, lon: place.geometry.location.nb },
        parts = [];
        for(var i = 0; i < place.address_components.length; i++) {
          var countryIndex = place.address_components[i].types.indexOf('country');
          var countyIndex = place.address_components[i].types.indexOf('administrative_area_level_2');
          var regionIndex = place.address_components[i].types.indexOf('administrative_area_level_1');
          var cityIndex = place.address_components[i].types.indexOf('locality');
          var localityIndex = place.address_components[i].types.indexOf('sublocality');
          if(countryIndex != -1) {
            geoInfo.country = place.address_components[i].long_name;
            parts.push(geoInfo.country);
          } else if (countyIndex != -1) {
            geoInfo.county = place.address_components[i].long_name;
            parts.push(geoInfo.county);
          } else if (regionIndex != -1) {
            geoInfo.region = place.address_components[i].long_name;
            parts.push(geoInfo.region);
          } else if (cityIndex != -1) {
            geoInfo.city = place.address_components[i].long_name;
            parts.push(geoInfo.city);
          } else if (localityIndex != -1) {
            geoInfo.locality = place.address_components[i].long_name;
            parts.push(geoInfo.locality);
          }
        }

        geoInfo.canonical = parts.join(', ');
        geoInfo.coords = geoInfo.lat + ',' + geoInfo.lon;

        return geoInfo;
      }

    	google.maps.event.addListener(autocomplete, 'place_changed', function() {
      		var place = autocomplete.getPlace();
          scope.form.geoinfo = formatGeoInfo(place);
    	});
  	}
  }).directive('tagManager', function() {
    return {
        restrict:'E',
        scope:{
            tags: '=ngModel'
        },
        replace:true,
        template: '<div>' +
            '<div class="col-6 u-mln u-pln"><input type="text" class="form-control" ng-model="tagField"  placeholder="E.g sightseeing, sunbathing" style="vertical-align: baseline;"/></div>' +
            '<div class="col-6 u-mts"><span class="label label-success" style="font-size: 12px; text-align:inline; margin-right:3px;" ng-repeat="tag in tags">{{tag}} <a ng-click="removeTag(tag)" alt="Remove tag">&times;</a></span></div>' +
            '</div>',

        link: function(scope, element, attrs) {
            scope.tagField = '';

            // Watching update on tagField to handle new comma input
            scope.$watch('tagField', function(value){
                if (value!= null) {
                    var values = value.split(/[,;\s]/);
                    if (values.length > 1) {
                        while (values.length>1) {
                            scope.addTag(values.shift());
                        }
                        scope.tagField=values.pop();
                    }
                }
            });

            // Remove a tag
            scope.removeTag = function(tag) {
              console.log(scope);
                scope.tags = scope.tags.filter(function(currentTag){
                    return currentTag.toLowerCase() != tag.toLowerCase();
                });
            };

            // Add a tag
            scope.addTag = function(tag){
                // Remove previous occurence if exists (avoid duplicated tag)
                scope.removeTag(tag);
                // Add tag to tagList
                scope.tags.push(tag);
            }

            // switch tag from tagField to TagList
            scope.switchToTagList = function(){
                scope.$apply(function() {
                    if (scope.tagField.trim().length > 0) {
                        scope.addTag(scope.tagField.trim());
                        scope.tagField = '';
                    }
                });
            }

            // Registering event on backspace, enter or lost focus
            element.find('input')
                .bind("keydown", function(e){
                // On backspace load the previous tag into tagField input
                if(e.keyCode == 8){
                    scope.$apply(function() {
                        if (scope.tagField=='') {
                        scope.tagField = scope.tags.pop();
                        }
                    });
                // On Enter switch tag to taglist
                }else if(e.keyCode == 13){
                    scope.switchToTagList();
                    }
                })
                // On lost focus -> add current tagfield content into tags array
                .bind("focusout", function(e){
                    scope.switchToTagList();
                    }
                );
        }
    }
});
