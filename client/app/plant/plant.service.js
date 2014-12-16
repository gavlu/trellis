'use strict';

angular.module('trellisApp')
  .factory('plantService', function ($http) {
    //i'd consider 
    //1. using something like ngresource
    //2. making it a class who's instances have these methods
    //   that way you don't have to pass plant id around all the time
    return {
      getPlant: function (plantId, cb) {
        $http.get("/api/plants/" + plantId).success(cb);
      },

    	createPlant: function (plant, cb) {
    		$http.post("/api/plants/", plant).success(cb);
    	},

      updatePlant: function (updatePlant, cb) {
        $http.patch("/api/plants/", updatePlant).success(cb);
      },
    	deletePlant: function(plantId, cb){
    		$http.delete("/api/plants/" + plantId + "/").success(cb);
    	}
    };
  });
