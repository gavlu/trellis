'use strict';

angular.module('trellisApp')
  .factory('userService', function ($http){
    return {
    	getPlants: function (cb) {
    		$http.get('/api/users/me/').success(function(me){
          cb(me.plants);
        });
    	},
    	searchUserByPhoneOrEmail: function (search, cb) {
    		$http.post('/api/users/userSearch/', search).success(cb);
    	},
      addToPlants: function (plantId, cb) {
        $http.put('/api/users/clone/', plantId).success(cb);
      },
      updateUser: function ( updateObj, cb ) {
        $http.patch('/api/users/', updateObj).success(cb);
      }
    };
  });
