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
  .controller('SearchCtrl', function ($scope, Auth, userService, $stateParams, searchHelper, plantService, $state) {
    var vm = this;
    
    //	--Autoloads the user with matching phone or email--
    /**** NOTE: Would not work on $scope ****/
    var searchInput = searchHelper.makeSearchObj($stateParams);

    $scope.user = {};
    /**** NOTE: this should be changed. Limit functions on scope
    			Can we add it into searchHelper? ****/
    var searchCB = function (data){
    	$scope.user = data;

    	$scope.currentUser = Auth.getCurrentUser();
    	
    	console.log($scope.currentUser);
    	
    	$scope.currentUser.plants.forEach(function(el) {
    		console.log(el);
    		console.log($scope.user._id);
    		if($scope.user._id == el.userId) {
    			/**** NOTE: fix the flicker ****/
    			$scope.inPlants = true;
			};
    	})
    	
    	console.log($scope.user)
    };
    userService.searchUserByPhoneOrEmail(searchInput, searchCB);
    //	--end of autoload--

    //	--Cloning feature--
    var addToPlantCB = function (newPlant){
    	console.log("this is your plant:")
    	console.log(newPlant);
    	
    	var plantId = { id: newPlant._id };
    	userService.addToPlants(plantId, function(data){
    		console.log("Successfully added plant!")
    	});
    	
    	$state.go('trellis');
    }
    $scope.clone = function() {
    	console.log("client: clone(), hit!")
    	console.log($scope.user);

    	$scope.user.userId = $scope.user._id;
    	delete $scope.user._id;

    	plantService.createPlant($scope.user, addToPlantCB);
    }
    // --End cloning feature--

  });
