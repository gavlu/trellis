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
    	$scope.emailOrPhone = "";
        
        $scope.user = data;

    	$scope.currentUser = Auth.getCurrentUser();
    	
    	$scope.currentUser.plants.forEach(function(el) {
    		if($scope.user._id == el.userId || 
    		   $scope.user._id == $scope.currentUser._id) {
    			/**** NOTE: fix the flicker ****/
    			$scope.noClone = true;

                console.log("Searched user already exists in trellis")
                console.log(el.userId == $scope.user._id);
			};
    	})
    	console.log("Searched user:")
    	console.log($scope.user)
    };
    userService.searchUserByPhoneOrEmail(searchInput, searchCB);
    //	--end of autoload--


    //	--Cloning feature--
    var addToPlantCB = function (newPlant){
    	console.log("this is your plant:")
    	console.log(newPlant);
    	
    	var plantId = { _id: newPlant._id };
    	userService.addToPlants(plantId, function(data){
    		console.log("Successfully added plant!")
    	});
    	
    	$state.go('trellis.plants');
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
