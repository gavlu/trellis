'use strict';

angular.module('trellisApp')
  .factory('userService', function ($http){
    // Public API here
    return {

    	/**** NOTE: This works without passing a cb,
    	is it just best practices? ****/

    	getPlants: function () {
    		$http.get('/api/users/populateTrellis/')
    	},

    	searchUserByPhoneOrEmail: function (search, cb) {
    		$http.post('/api/users/userSearch/', search)
    			.success(cb);
    	}
    };
  });
