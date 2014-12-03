'use strict';

angular.module('trellisApp')
  .factory('plantService', function ($http) {
    return {
        getPlant: function (plantId, cb) {
            $http.get("/api/plants/" + plantId)
                .success(cb);
        },

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
