'use strict';

angular.module('trellisApp')
  .factory('userService', function ($http){
    // Public API here
    return {
    	getPlants: function () {
    		$http.get('/api/users/populateTrellis/')
    	},

    	searchUserByPhoneOrEmail: function (search, cb) {
    		$http.post('/api/user/userSearch/', search, cb);
    	}
    };
  });
