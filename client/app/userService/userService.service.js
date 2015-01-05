'use strict';

angular.module('trellisApp')
  .factory('userService', function ($http, Auth){
    return {
      // fullstack angular generator already has one of these, i think
    	getPlants: function (cb) {

    		$http.get('/api/users/populateTrellis/').success(cb);
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
