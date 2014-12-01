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
  .controller('SearchCtrl', function ($scope, userService, $stateParams, searchHelper, plantService) {
    var vm = this;
    
    /**** NOTE: Would not work on $scope ****/
    var searchInput = searchHelper.makeSearchObj($stateParams);
    $scope.user = {};
    /**** NOTE: this should be changed. Limit functions on scope
    			Can we add it into searchHelper? ****/
    var searchCB = function (data){
    	$scope.user = data;
    	console.log($scope.user)
    };
    userService.searchUserByPhoneOrEmail(searchInput, searchCB);




    var cloneCB = function (newPlant){
    	console.log("this is your plant:")
    	console.log(newPlant._id);
    	var plantId = { id: newPlant._id };
    	userService.clone(plantId, function(){
    		console.log("Successfully added plant!")
    	})
    }
    $scope.clone = function() {
    	console.log("client: clone(), hit!")
    	console.log($scope.user);

    	plantService.createPlant($scope.user, cloneCB);
    }
  });
