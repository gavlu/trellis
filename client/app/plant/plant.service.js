'use strict';

angular.module('trellisApp')
  .factory('plantService', function ($http) {
    return {
    	createPlant: function (plant, cb) {
    		$http.post("/api/plants/", plant)
    			.success(cb);
    	}
    }
  });
