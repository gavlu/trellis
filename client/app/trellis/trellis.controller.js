'use strict';

angular.module('trellisApp')
  .controller('TrellisCtrl', function ($scope, Auth, $http, userService, $state) {
  	console.log("TrellisCtrl, hit");

  	// userService.getPlants()
  	// 	.success(function(plants, status){
  	// 		console.log(plants);
  	// 	})
  	// 	.error(function(err, status) {
  	// 		console.log("You have no plants!");
  	// 	});	

  	$scope.search = function(emailOrPhone) {
  		var email = new RegExp("@"),
  			input = {};
  		// console.log(email.test(emailOrPhone) + "!!")
  		if(email.test(emailOrPhone)) {
  			input.email = emailOrPhone;
  			// console.log(input);
  			$state.go('searchView', {
  				"inputType": "email",
  				"input": input.email
  			});
  		}
  		else {
  			input.phone = emailOrPhone.split(" ").join("_");
  			// console.log(input);
  			$state.go('searchView', {
  				"inputType": "phone",
  				"input": input.phone
  			});
  		}
  		
  		// console.log(emailOrPhone);
  		// $state.go('searchView', {"input": emailOrPhone});
  	}

    $scope.test = [1,2,3,4,5,6,7];
    $scope.urgent = [1,2,3,4,5,6];
  });
