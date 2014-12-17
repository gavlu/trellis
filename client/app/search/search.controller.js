'use strict';

angular.module('trellisApp')
  .controller('SearchCtrl', function ($scope, Auth, userService, $stateParams, searchHelper, plantService, $state) {
    var vm = this;
    vm.clone   = clone;
    vm.uncheck = uncheck;

    //	--Autoloads the user with matching phone or email--
    /**** NOTE: Would not work on $scope ****/
    var searchInput = searchHelper.makeSearchObj($stateParams);

    $scope.user = {};
    var mutableCopy = {};
    /**** NOTE: this should be changed. Limit functions on scope
    			Can we add it into searchHelper? ****/
    var searchCB = function (data){
    	$scope.emailOrPhone = "";
      $scope.user = data;
      mutableCopy = angular.copy( $scope.user );

    	$scope.currentUser = Auth.getCurrentUser();

    	$scope.currentUser.plants.forEach(function(el) {
    	  if($scope.user._id === el.userId || $scope.user._id === $scope.currentUser._id) {
    			/**** NOTE: fix the flicker ****/
    			$scope.noClone = true;
		    };
    	});
    };

    userService.searchUserByPhoneOrEmail(searchInput, searchCB);
    //	--end of autoload--

    function uncheck( prop ) {
      if ( !!mutableCopy[prop] ) {
        delete mutableCopy[prop];
      } else {
        mutableCopy[prop] = $scope.user[prop];
      }
    };

    //	--Cloning feature--
    var addToPlantCB = function (newPlant){
    	var plantId = { _id: newPlant._id };
    	userService.addToPlants(plantId, function(data){
    		console.log('Successfully added plant!');
    	});
    	$state.go('trellis.plants');
    };


    function clone() {
    	mutableCopy.userId = mutableCopy._id;
      mutableCopy.ownerId = Auth.getCurrentUser()._id;
    	delete mutableCopy._id;
    	plantService.createPlant(mutableCopy, addToPlantCB);
    };
    // --End cloning feature--

  });
