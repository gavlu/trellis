'use strict';

angular.module('trellisApp')
  .controller('TrellisCtrl', function ($scope, Auth, $http, userService, $state) {
  	console.log("TrellisCtrl, hit");

    var cb = function (plants) {
      $scope.plants = plants
      Auth.getCurrentUser().plants = $scope.plants;
    };

  	userService.getPlants(cb);

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
