'use strict';

angular.module('trellisApp')
  .factory('searchHelper', function () {
  	return {
  		makeSearchObj: function (stateParams) {
  			var searchObj;
	    	if(stateParams.inputType == "phone"){
	    		console.log("phone, hit!");
	    		searchObj = {
	    			"phone": stateParams.input
	    		}
	    		return searchObj;
	    	}
	    	else {
	    		console.log("email, hit!");
	    		searchObj = {
	    			"email": stateParams.input
	    		}
	    		return searchObj;
	    	}
    	}
  	}
  })
  .controller('SearchCtrl', function ($scope, userService, $stateParams, searchHelper) {
    /**** NOTE: Would not work on $scope ****/
    var searchInput = searchHelper.makeSearchObj($stateParams);

    $scope.user;

    /**** NOTE: this must be changed. Limit functions on scope****/
    var cb = function (data){
    	$scope.user = data;
    }

    userService.searchUserByPhoneOrEmail(searchInput, cb);
  });
