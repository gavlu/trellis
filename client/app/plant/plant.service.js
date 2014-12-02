'use strict';

angular.module('trellisApp')
  .factory('plantService', function ($http) {
    return {
    	createPlant: function (plant, cb) {
    		$http.post("/api/plants/", plant)
    			.success(cb);
    	},
    	deletePlant: function(plantId, cb){
    		$http.delete("/api/plants/" + plantId + "/")
    			.success(cb);
    	}
    }
  });
